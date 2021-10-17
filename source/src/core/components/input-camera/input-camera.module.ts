import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InputCameraComponent } from './input-camera.component';

@NgModule({
  declarations: [InputCameraComponent],
  imports: [CommonModule, IonicModule],
  exports: [InputCameraComponent],
})
export class InputCameraModule {}
