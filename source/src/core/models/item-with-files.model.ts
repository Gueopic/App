import { Photo } from '@capacitor/camera';
import { FileData } from './file-data.model';
import { ItemModel } from './item.model';

export interface ItemWithFilesModel extends ItemModel {
  audio: FileData<any>;
  image: FileData<Photo>;
}
