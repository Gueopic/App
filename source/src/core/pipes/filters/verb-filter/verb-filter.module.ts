import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerbFilterPipe } from './verb-filter.pipe';

@NgModule({
  declarations: [VerbFilterPipe],
  imports: [CommonModule],
  exports: [VerbFilterPipe],
})
export class VerbFilterModule {}
