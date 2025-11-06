import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtualScrollComponent } from './virtual-scroll.component';

@NgModule({
  exports: [VirtualScrollComponent],
  imports: [CommonModule, FormsModule, IonicModule, ScrollingModule],
  declarations: [VirtualScrollComponent],
})
export class VirtualScrollModule {}
