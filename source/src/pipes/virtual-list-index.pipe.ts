import { Pipe, PipeTransform } from '@angular/core';
import { Imgtext } from 'src/interfaces/global.interfaces';

@Pipe({
  name: 'virtualListIndex',
})
export class VirtualListIndexPipe implements PipeTransform {
  transform(array: Array<Imgtext>, exteraCol?: number): Imgtext[][] {
    return [array];
  }
}
