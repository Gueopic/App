import { Photo } from '@capacitor/camera';
import { FileData } from './file-data.model';
import { VerbModel } from './verb.model';

export interface VerbWithFilesModel extends VerbModel {
  audio: FileData<any>;
}
