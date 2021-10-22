import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileData } from 'src/core/models/file-data.model';

// eslint-disable-next-line max-len
const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mOUefGynoEIwDiqkL4KAR6aGEOAAYJ5AAAAAElFTkSuQmCC';
const defaultAudio = {
  value: {
    recordDataBase64:
      // eslint-disable-next-line max-len
      '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\nAAAAYUAgggiBI5PKPm2tOOOOWABlAAAAAADg\n',
    msDuration: 1280,
    mimeType: 'audio/aac',
  },
};

@Component({
  selector: 'gueo-playground-components',
  templateUrl: 'playground-components.page.html',
})
export class PlaygroundComponentsPage implements OnInit {

  form: FormGroup;

  defaultImage: FileData<any> = new FileData<any>();
  defaultAudio: FileData<any> = new FileData<any>();

  constructor() {}

  ngOnInit() {
    this.defaultImage.setBase64(defaultImage);
    this.defaultAudio.setBase64(`data:${defaultAudio.value.mimeType};base64,${defaultAudio.value.recordDataBase64}`);

    this.form = new FormGroup({
      // Take photos
      takePhotoNew: new FormControl(),
      takePhotoModify: new FormControl(this.defaultImage),

      // Record audio
      recordAudioNew: new FormControl(),
      recordAudioModify: new FormControl(this.defaultAudio),
    });
  }

  dumpForm(): void {
    console.log('RAW:', this.form.getRawValue());
  }
}
