import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'gueo-edit-object',
  templateUrl: './edit-object.component.html',
  providers: [FormBuilder],
})
export class EditObjectComponent implements OnInit {
  @Input() item: any;

  form: FormGroup;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: [''],
    });
  }

  close() {
    this.modalController.dismiss();
  }

  save() {
    console.log(this.form.value);
  }
}
