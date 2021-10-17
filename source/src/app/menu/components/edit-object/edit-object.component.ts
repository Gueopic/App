import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'gueo-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.scss'],
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
    this.initForm();
  }

  close(): void {
    this.modalController.dismiss();
  }

  save(): void {
    console.log(this.form.value);
  }

  initForm(): void {
    this.form = this.fb.group({
      text: this.item.text,
    });
  }

  onEditText(event: any): void {
    this.form.patchValue({ text: event.target.value });
  }

  editImage() {
    // TODO: Add image service
  }

  recordSound() {}
}
