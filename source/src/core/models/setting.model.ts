import { StorageElement } from '../database/core/storage.elements';

export interface SettingModel extends StorageElement {
  id: string;
  value: string;
}
