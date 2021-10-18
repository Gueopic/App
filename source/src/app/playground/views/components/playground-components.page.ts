import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileData } from 'src/core/models/file-data.model';

// eslint-disable-next-line max-len
const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mOUefGynoEIwDiqkL4KAR6aGEOAAYJ5AAAAAElFTkSuQmCC';

@Component({
  selector: 'gueo-playground-components',
  templateUrl: 'playground-components.page.html',
})
export class PlaygroundComponentsPage implements OnInit {

  form: FormGroup;

  defaultImage: FileData<any>;

  constructor() {}

  ngOnInit() {
    this.defaultImage = new FileData<any>();
    this.defaultImage.setBase64(defaultImage);

    this.form = new FormGroup({
      takePhotoNew: new FormControl(),
      takePhotoModify: new FormControl(this.defaultImage),
    });
  }

  dumpForm(): void {
    console.log('RAW:', this.form.getRawValue());
  }
}
