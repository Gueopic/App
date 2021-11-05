import { Injectable } from '@angular/core';
import {
  Camera,
  CameraPermissionState,
  CameraResultType,
  CameraSource,
  Photo
} from '@capacitor/camera';
import { FileData } from '../models/file-data.model';

@Injectable()
export class CameraService {
  constructor() {}

  async takePicture(source = CameraSource.Camera): Promise<FileData<Photo>> {
    const permissions = await this.checkPermissions();

    if (permissions === 'granted') {
      const photo: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        allowEditing: true,
        source,
        quality: 50,
        width: 500,
        height: 500,
        correctOrientation: true,
      });
      return this.convertToFileData(photo);
    }

    return null;
  }

  convertToFileData(photo: Photo): FileData<Photo> {
    const fileData = new FileData(photo);
    fileData.filePath = photo.path;
    fileData.setWebPath(photo.webPath);
    return fileData;
  }

  protected checkPermissions(): Promise<CameraPermissionState> {
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
