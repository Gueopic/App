import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtualListIndexPipe } from 'src/pipes/virtual-list-index.pipe';
import { VirtualScrollComponent } from './virtual-scroll.component';

@NgModule({
  exports: [VirtualScrollComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [VirtualScrollComponent, VirtualListIndexPipe],
})
export class VirtualScrollModule {}
