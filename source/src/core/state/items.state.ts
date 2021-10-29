import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ItemsDatabaseService } from '../database/items-database.service';
import { FileData } from '../models/file-data.model';
import { ItemWithFilesModel } from '../models/item-with-files.model';
import { ItemModel } from '../models/item.model';
import { StateFromDB, StateFromDBService } from './core/state-db.base';

class State extends StateFromDB<ItemModel> {
  itemsWithFiles = new BehaviorSubject<ItemWithFilesModel[]>(null);
  itemsWithFilesIndexed: { [id: string]: ItemWithFilesModel } = {};
}

@Injectable({
  providedIn: 'root',
})
export class ItemsStateService extends StateFromDBService<
  ItemModel,
  ItemsDatabaseService
> {
  state = new State();

  readonly itemsWithFiles: Observable<ItemWithFilesModel[]> =
    this.state.itemsWithFiles.asObservable();

  constructor(private itemsDatabase: ItemsDatabaseService) {
    super(itemsDatabase);
    this.itemsChangeListener();
  }

  async insert(element: ItemWithFilesModel): Promise<ItemWithFilesModel[]> {
    const cleanModel = this.mapToModel(element);
    await super.insert(cleanModel);
    return this.itemsWithFiles.toPromise();
  }

  private mapToModel(element: ItemWithFilesModel): ItemModel {
    return {
      text: element.text,
      audioFileName: element.audioFileName,
      imageFilename: element.imageFilename,
      audioLength: element.audioLength,
    };
  }

  private itemsChangeListener(): void {
    this.elements$
      .pipe(
        distinctUntilChanged(),
        tap((items) => {
          this.state.itemsWithFiles.next(this.appendFileDataToItems(items));
        })
      )
      .subscribe();
  }

  /**
   * Create a new array with all items with the corresponding files attached
   * This will use "itemsWithFilesIndexed" to improve performance
   *
   * @param newItems New items retrieved
   */
  private appendFileDataToItems(newItems: ItemModel[]): ItemWithFilesModel[] {
    if (!newItems) {
      return [];
    }
    const currentItems = this.state.itemsWithFilesIndexed;
    const mappedItems: ItemWithFilesModel[] = [];

    for (const item of newItems) {
      let currentItem: ItemWithFilesModel = currentItems[item.id];
      if (
        !currentItem ||
        item.audioFileName !== currentItem.audioFileName ||
        item.imageFilename !== currentItem.imageFilename
      ) {
        currentItems[item.id] = currentItem = this.createItemData(item);
      }
      mappedItems.push(currentItem);
    }

    return mappedItems;
  }

  private createItemData(item: ItemModel): ItemWithFilesModel {
    const audio = new FileData<any>();
    audio.filePath = item.audioFileName;

    const image = new FileData<any>();
    image.filePath = item.imageFileName;

    return {
      ...item,
      audio,
      image,
    };
  }
}
