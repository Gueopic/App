import { Injectable } from '@angular/core';
import { Camera, CameraPermissionState, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FilesystemService } from './filesystem.service';

@Injectable({
    providedIn: 'root'
})
export class CameraService {
    constructor(
        private fsService: FilesystemService,
    ) { }

    async takePicture(source = CameraSource.Camera) {
        const permissions = await this.checkPermissions();

        if (permissions === 'granted') {
            return Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source,
                quality: 50,
            });
        }

        return null;
    }

    async savePicture(folder: string, cameraPhoto: Photo) {
        // folder ex: '/items/pictures/'
        // Write the file to the data directory
        const fileName = new Date().getTime() + '.jpeg';
        await this.fsService.write(folder + fileName, cameraPhoto.base64String);

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath
        };
    }

    private checkPermissions(): Promise<CameraPermissionState> {
        return new Promise(async (resolve, reject) => {
            try {
                const checkPermissions = await Camera.checkPermissions();
                let permission: CameraPermissionState;
                if (checkPermissions.camera === 'granted') {
                    permission = checkPermissions.camera;
                } else {
                    const requestPermissions = await Camera.requestPermissions();

                    if (requestPermissions.camera === 'granted') {
                        permission = requestPermissions.camera;
                    }
                }
                return resolve(permission);

            } catch (error) {
                return reject(error);
            }
        });
    }
}
