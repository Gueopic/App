import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SponsorsFooterComponent } from './sponsors-footer.component';

@NgModule({
  declarations: [SponsorsFooterComponent],
  exports: [SponsorsFooterComponent],
  imports: [CommonModule, IonicModule],
})
export class SponsorsFooterModule {}
