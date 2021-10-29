import { StorageElement } from '../database/core/storage.elements';

export interface ItemModel extends StorageElement {
  text: string;
  imageFilename: string;
  audioFileName: string;
  audioLength: number;
}
