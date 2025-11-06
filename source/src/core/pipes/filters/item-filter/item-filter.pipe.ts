import { Pipe, PipeTransform } from '@angular/core';
import { ItemModel } from 'src/core/models/item.model';

@Pipe({
    name: 'itemFilterPipe',
    standalone: false
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: ItemModel[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    return items.filter(
      (item) =>
        item?.text?.toLowerCase().indexOf(searchTerm?.toLowerCase()) !== -1,
    );
  }
}
