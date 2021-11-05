import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ItemWithFilesModel } from 'src/core/models/item-with-files.model';

@Component({
  selector: 'gueo-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.scss'],
  providers: [FormBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditObjectComponent implements OnInit {
  @Input() item: ItemWithFilesModel;

  @Output() save = new EventEmitter<ItemWithFilesModel>();

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

  initForm(): void {
    this.form = this.fb.group({
      // id is a hidden field just to manage "update" cases
      id: this.fb.control(null),
      text: this.fb.control(null, [ Validators.required ]),
      audio: new FormControl(null, [ Validators.required ]),
      image: new FormControl(null, [ Validators.required ]),
    });

    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }
}
