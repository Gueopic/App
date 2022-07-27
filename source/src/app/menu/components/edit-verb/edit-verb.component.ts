import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
  @ViewChild('verbInput') verbInput;
  @Input() verb: VerbWithFilesModel;

  @Output() save = new EventEmitter<VerbWithFilesModel>();

  form: FormGroup;

  defaultVerbs = [
    { text: 'Beber', disabled: false },
    { text: 'Comer', disabled: false },
    { text: 'Encender', disabled: false },
    { text: 'Traer', disabled: false },
    { text: 'Subir', disabled: false },
    { text: 'Ir', disabled: false },
  ];
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
      audio: new FormControl(null),
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

  onSelectVerb(verb, index) {
    this.form.controls['text'].setValue(verb.text + ' ');
    this.verbInput.setFocus();
    this.defaultVerbs.map((e) => (e.disabled = false));
    this.defaultVerbs[index].disabled = true;
  }
}
