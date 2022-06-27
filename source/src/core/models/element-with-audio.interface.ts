import { FileData } from './file-data.model';

export interface ElementWithAudio {
  text: string;
  audio: FileData<any>;
}
