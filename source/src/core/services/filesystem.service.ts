import { Injectable } from '@angular/core';
import {
  Directory,
  Encoding,
  Filesystem,
  ReadFileResult,
} from '@capacitor/filesystem';
import { FileData } from '../models/file-data.model';

@Injectable({
  providedIn: 'root',
})
export class FilesystemService {
  async write(
    path: string,
    data: string,
    directory = Directory.Documents
  ): Promise<void> {
    const baseFolder = path.split('/');
    baseFolder.pop();
    await this.ensureFolderExist(baseFolder.join('/'), directory);
    await Filesystem.writeFile({
      path,
      data,
      directory,
      encoding: Encoding.UTF8,
    });
  }

  async writeFileData(
    fileData: FileData<any>,
    directory = Directory.Documents
  ): Promise<void> {
    return this.write(fileData.filePath, await fileData.getBase64(), directory);
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
    const data = await Filesystem.readFile({
      path,
      directory,
    });

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
