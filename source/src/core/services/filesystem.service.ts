import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { FileData } from '../models/file-data.model';

export const BASE_FOLDER = 'gueopic/';

@Injectable({
  providedIn: 'root',
})
export class FilesystemService {
  async write(
    destinationPath: string,
    data: string,
    directory = Directory.Documents,
  ): Promise<void> {
    const baseFolder = destinationPath.split('/');
    baseFolder.pop();
    // await this.ensureFolderExist(baseFolder.join('/'), directory);
    await Filesystem.writeFile({
      path: destinationPath,
      data,
      directory,
      // The data will stored as "string" in web mode
      encoding: Capacitor.isNativePlatform() ? undefined : Encoding.UTF8,
      recursive: true,
    });
  }

  /**
   * Write the content of a file to the filesystem
   * Also sets the file path in the fileData object
   */
  async writeFileData(
    fileData: FileData<any>,
    destinationPath: string,
    directory = Directory.Documents,
  ): Promise<void> {
    await this.write(destinationPath, await fileData.getBase64(), directory);
    fileData.filePath = destinationPath;
  }

  async ensureFolderExist(path: string, directory): Promise<void> {
    try {
      await Filesystem.mkdir({
        path,
        recursive: true,
        directory,
      });
    } catch (ex) {}
  }

  async read(
    path: string,
    directory: Directory = Directory.Documents,
  ): Promise<FileData<any>> {
    const fileData = new FileData();
    const { uri } = await Filesystem.getUri({ path, directory });
    fileData.relativePath = path;
    fileData.filePath = uri;
    // fileData.setBase64(await this.getFileContent(fileData, directory));
    fileData.getWebPath(); // Preload web path/base 64
    return fileData;
  }

  // async getFileContent(fileData: FileData<any>, directory = Directory.Documents): Promise<string> {
  //   const fileContent = await Filesystem.readFile({
  //     path: fileData.filePath,
  //     directory,
  //   });
  //   return fileContent.data;
  // }

  async delete(path: string, directory = Directory.Documents): Promise<void> {
    return Filesystem.deleteFile({ path, directory });
  }
}
