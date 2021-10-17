import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateObjectComponent } from './create-object.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [CreateObjectComponent],
})
export class CreateObjectModule {}
