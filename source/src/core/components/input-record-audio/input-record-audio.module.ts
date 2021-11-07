import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputRecordAudioComponent } from './input-record-audio.component';

@NgModule({
  declarations: [InputRecordAudioComponent],
  imports: [CommonModule, TranslateModule, IonicModule],
  exports: [InputRecordAudioComponent],
})
export class InputRecordAudioModule {}
