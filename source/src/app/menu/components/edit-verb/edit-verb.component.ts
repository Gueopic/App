import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { VerbWithFilesModel } from 'src/core/models/verb-with-files.model';

@Component({
  selector: 'gueo-edit-verb',
  templateUrl: './edit-verb.component.html',
  styleUrls: ['./edit-verb.component.scss'],
  providers: [FormBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditVerbComponent implements OnInit {
  @Input() verb: VerbWithFilesModel;

  @Output() save = new EventEmitter<VerbWithFilesModel>();

  form: FormGroup;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
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
      text: this.fb.control(null, [Validators.required]),
      audio: new FormControl(null, [Validators.required]),
    });

    if (this.verb) {
      this.form.patchValue(this.verb);
    }
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }
}
