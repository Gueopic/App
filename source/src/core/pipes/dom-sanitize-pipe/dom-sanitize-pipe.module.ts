import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizePipe } from './dom-sanitize.pipe';

@NgModule({
  declarations: [DomSanitizePipe],
  imports: [CommonModule],
  exports: [DomSanitizePipe],
})
export class DomSanitizePipeModule {}
