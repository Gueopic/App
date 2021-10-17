import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'gueo-create-object',
  templateUrl: './create-object.component.html',
  providers: [FormBuilder],
})
export class CreateObjectComponent implements OnInit {
  createObjectForm: FormGroup;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createObjectForm = this.fb.group({
      createObject: '',
      image: null,
      audio: null,
    });
  }

  close() {
    this.modalController.dismiss();
  }

  onChangeInput(event: any) {
    this.createObjectForm.patchValue({ createObject: event.target.value });
  }

  save() {
    console.log(this.createObjectForm.value);
  }
}
