import { Injectable } from '@angular/core';
import {
  Camera,
  CameraPermissionState,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FileData } from '../models/file-data.model';

@Injectable()
export class CameraService {
  constructor(
    public actionSheetController: ActionSheetController,
    private translate: TranslateService,
  ) {}

  async takePicture(): Promise<FileData<any>> {
    const permissions = await this.checkPermissions();
    if (permissions !== 'granted') {
      return;
    }

    return new Promise(async (resolve, reject) => {
      const actionSheet = await this.actionSheetController.create({
        header: this.translate.instant('components.take_photo.hub.title'),
        buttons: [
          {
            text: this.translate.instant(
              'components.take_photo.hub.take_picture',
            ),
            icon: 'camera-outline',
            handler: async () => {
              resolve(await this.getPhotoFromCamera());
            },
          },
          {
            text: this.translate.instant(
              'components.take_photo.hub.from_photos',
            ),
            icon: 'images-outline',
            handler: async () => {
              resolve(await this.getPhotoFromAlbum());
            },
          },
          {
            text: this.translate.instant('common.actions.cancel'),
            icon: 'close',
            role: 'cancel',
            handler: () => {},
          },
        ],
      });
      await actionSheet.present();

      const role = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    });
  }

  convertToFileData(photo: Photo): FileData<Photo> {
    const fileData = new FileData(photo);
    fileData.filePath = photo.path;
    fileData.setWebPath(photo.webPath);
    return fileData;
  }

  async getPhotoFromCamera(): Promise<FileData<Photo>> {
    return await this.doGetPhoto(CameraSource.Camera);
  }

  async getPhotoFromAlbum(): Promise<FileData<Photo>> {
    return await this.doGetPhoto(CameraSource.Photos);
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

  protected async doGetPhoto(source: CameraSource): Promise<FileData<Photo>> {
    const permissions = await this.checkPermissions();

    if (permissions === 'granted') {
      const photo: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        allowEditing: false,
        source,
        quality: 50,
        width: 500,
        height: 500,
        correctOrientation: true,
      });
      return this.convertToFileData(photo);
    }
  }
}
