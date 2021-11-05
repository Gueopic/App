import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileData } from 'src/core/models/file-data.model';
import { photoMock } from 'src/core/services/mocks/camera.service.mock';
import { recordMock } from 'src/core/services/mocks/audio.service.mock';

// eslint-disable-next-line max-len
const defaultImage = photoMock.base64String;
const defaultAudio = recordMock;

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
