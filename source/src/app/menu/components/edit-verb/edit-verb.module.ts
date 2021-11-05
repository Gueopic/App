import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorValidationWrapperModule } from 'src/core/components/error-validation-wrapper/error-validation-wrapper.module';
import { InputCameraModule } from '../../../../core/components/input-camera/input-camera.module';
import { InputRecordAudioModule } from '../../../../core/components/input-record-audio/input-record-audio.module';
import { EditVerbComponent } from './edit-verb.component';

@NgModule({
  declarations: [EditVerbComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ErrorValidationWrapperModule,
    InputCameraModule,
    InputRecordAudioModule,
  ],
  exports: [EditVerbComponent],
})
export class EditVerbModule {}
