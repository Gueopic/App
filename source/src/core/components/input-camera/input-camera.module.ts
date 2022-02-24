import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizePipeModule } from 'src/core/pipes/dom-sanitize-pipe/dom-sanitize-pipe.module';
import { InputCameraComponent } from './input-camera.component';

@NgModule({
  declarations: [InputCameraComponent],
  imports: [CommonModule, IonicModule, TranslateModule, DomSanitizePipeModule],
  exports: [InputCameraComponent],
})
export class InputCameraModule {}
