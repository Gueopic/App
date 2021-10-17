import { Injectable } from '@angular/core';
import {
  Directory,
  Encoding, Filesystem, ReadFileResult
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
    await Filesystem.writeFile({
      path,
      data,
      directory,
      encoding: Encoding.UTF8,
    });
  }

  async writeFileData(fileData: FileData<any>, directory = Directory.Documents): Promise<void> {
    await Filesystem.writeFile({
      path: fileData.filePath,
      data: await fileData.getBase64(),
      directory,
      encoding: Encoding.UTF8,
    });
  }

  async read(path: string, directory?: Directory): Promise<FileData<any>> {
    const fileData = new FileData();
    const data = await Filesystem.readFile({
      path,
      directory,
    });

    const { uri } = await Filesystem.getUri({path, directory});
    fileData.setBase64(data.data);
    fileData.relativePath = path;
    fileData.filePath = uri;
    return fileData;
  }

  async delete(path: string, directory = Directory.Documents): Promise<void> {
    return Filesystem.deleteFile({ path, directory });
  }
}
