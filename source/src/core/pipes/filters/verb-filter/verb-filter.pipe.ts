import { Pipe, PipeTransform } from '@angular/core';
import { VerbModel } from 'src/core/models/verb.model';

@Pipe({
    name: 'verbFilterPipe',
    standalone: false
})
export class VerbFilterPipe implements PipeTransform {
  transform(verbs: VerbModel[], searchTerm: string): any[] {
    if (!verbs || !searchTerm) {
      return verbs;
    }
    return verbs.filter(
      (verb) =>
        verb?.text?.toLowerCase().indexOf(searchTerm?.toLowerCase()) !== -1,
    );
  }
}
