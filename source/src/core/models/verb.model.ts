import { StorageElement } from '../database/core/storage.elements';

export interface VerbModel extends StorageElement {
  text: string;
  audioFileName: string;
}
