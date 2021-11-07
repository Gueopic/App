import { Injectable } from '@angular/core';
import {
  Directory,
  Encoding,
  Filesystem,
  ReadFileResult,
} from '@capacitor/filesystem';
import { FileData } from '../models/file-data.model';

export const BASE_FOLDER = 'gueopic/';

@Injectable({
  providedIn: 'root',
})
export class FilesystemService {
  async write(
    destinationPath: string,
    data: string,
    directory = Directory.Documents
  ): Promise<void> {
    const baseFolder = destinationPath.split('/');
    baseFolder.pop();
    await this.ensureFolderExist(baseFolder.join('/'), directory);
    await Filesystem.writeFile({
      path: destinationPath,
      data,
      directory,
    });
  }

  /**
   * Write the content of a file to the filesystem
   * Also sets the file path in the fileData object
   */
  async writeFileData(
    fileData: FileData<any>,
    destinationPath: string,
    directory = Directory.Documents
  ): Promise<void> {
    await this.write(destinationPath, await fileData.getBase64Data(), directory);
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

  async read(path: string, directory: Directory = Directory.Documents): Promise<FileData<any>> {
    const fileData = new FileData();
    let data;
    try {
      data = await Filesystem.readFile({
        path,
        directory,
      }).catch(() => null);;
    } catch (ex) {
      console.error(ex);
    }

    if (!data) {
      return null;
    }

    const { uri } = await Filesystem.getUri({ path, directory });
    fileData.setBase64(data.data);
    fileData.relativePath = path;
    fileData.filePath = uri;
    fileData.getWebPath(); // Start loading
    return fileData;
  }

  async delete(path: string, directory = Directory.Documents): Promise<void> {
    return Filesystem.deleteFile({ path, directory });
  }
}
