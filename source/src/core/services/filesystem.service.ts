import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, ReadFileResult } from '@capacitor/filesystem';

@Injectable({
    providedIn: 'root'
})
export class FilesystemService {

    async write(path: string, data: string, directory = Directory.Documents) {
        await Filesystem.writeFile({
            path,
            data,
            directory,
            encoding: Encoding.UTF8,
        });
    };

    async read(path: string, directory?: Directory): Promise<ReadFileResult> {
        if (directory) {
            return Filesystem.readFile({
                path,
                directory,
                encoding: Encoding.UTF8,
            });
        }

        return Filesystem.readFile({ path });
    };

    async delete(path: string, directory = Directory.Documents) {
        return Filesystem.deleteFile({ path, directory });
    };
}
