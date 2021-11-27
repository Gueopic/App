import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorValidationWrapperComponent } from './error-validation-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ErrorValidationWrapperComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [ErrorValidationWrapperComponent],
})
export class ErrorValidationWrapperModule {}
