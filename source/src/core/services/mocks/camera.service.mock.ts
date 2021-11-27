import { Injectable } from '@angular/core';
import { CameraPermissionState, CameraSource, Photo } from '@capacitor/camera';
import { FileData } from '../../models/file-data.model';
import { CameraService } from '../camera.service';

export const photoMock = {
  base64String:
    // eslint-disable-next-line max-len
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAR0lEQVR42u3PQREAMAgAoNljXa2rLczg14MGxK/Od0CIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiGwMzLh5S8dJS+IAAAAASUVORK5CYII=',
} as Photo;

@Injectable()
export class CameraServiceMock extends CameraService {
  getMock(): Photo {
    return photoMock;
  }

  async takePicture(source = CameraSource.Camera): Promise<FileData<Photo>> {
    const fileData = new FileData<Photo>(photoMock);
    fileData.setBase64(photoMock.base64String);
    return fileData;
  }

  protected checkPermissions(): Promise<CameraPermissionState> {
    return {} as any;
  }
}
