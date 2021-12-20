import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputCameraComponent } from './input-camera.component';

@NgModule({
  declarations: [InputCameraComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [InputCameraComponent],
})
export class InputCameraModule {}
