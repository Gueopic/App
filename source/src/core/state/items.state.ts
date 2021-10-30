import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ItemsDatabaseService } from '../database/items-database.service';
import { FileData } from '../models/file-data.model';
import { ItemWithFilesModel } from '../models/item-with-files.model';
import { ItemModel } from '../models/item.model';
import { FilesystemService } from '../services/filesystem.service';
import { StateFromDB, StateFromDBService } from './core/state-db.base';

class State extends StateFromDB<ItemModel> {
  itemsWithFiles = new BehaviorSubject<ItemWithFilesModel[]>(null);
  itemsWithFilesIndexed: { [id: string]: ItemWithFilesModel } = {};
}

export const ITEMS_FOLDER = 'items';

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

  constructor(
    private itemsDatabase: ItemsDatabaseService,
    private filesystemService: FilesystemService
  ) {
    super(itemsDatabase);
    this.itemsChangeListener();
  }

  async insert(element: ItemWithFilesModel): Promise<ItemWithFilesModel[]> {
    // Save the files
    const nextId = await this.dbService.getNextId();
    element.imageFileName = await this.persistImage(nextId, element.image);
    element.audioFileName = await this.persistAudio(nextId, element.audio);

    // Store in the database
    const cleanModel = this.mapToModel(element);
    cleanModel.audioLength = element.audio.originalFile.value.msDuration;
    await super.insert(cleanModel);
    return this.itemsWithFiles.toPromise();
  }

  async update(element: ItemWithFilesModel): Promise<ItemWithFilesModel[]> {
    // TODO: Remove old files


    // Save the files
    const nextId = await this.dbService.getNextId();
    element.imageFileName = await this.persistImage(nextId, element.image);
    element.audioFileName = await this.persistAudio(nextId, element.audio);

    // Store in the database
    const cleanModel = this.mapToModel(element);
    await super.insert(cleanModel);
    return this.itemsWithFiles.toPromise();
  }

  private mapToModel(element: ItemWithFilesModel): ItemModel {
    return {
      text: element.text,
      audioFileName: element.audioFileName,
      imageFileName: element.imageFileName,
      audioLength: element.audioLength,
    };
  }

  private itemsChangeListener(): void {
    this.elements$
      .pipe(
        distinctUntilChanged(),
        switchMap((items) => from(this.appendFileDataToItems(items))),
        tap((itemsWithFiles) => {
          this.state.itemsWithFiles.next(itemsWithFiles);
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
  private async appendFileDataToItems(newItems: ItemModel[]): Promise<ItemWithFilesModel[]> {
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
        item.imageFileName !== currentItem.imageFileName
      ) {
        currentItems[item.id] = currentItem = await this.createItemData(item);
      }
      mappedItems.push(currentItem);
    }

    return mappedItems;
  }

  private async createItemData(item: ItemModel): Promise<ItemWithFilesModel> {
    const audio = await this.filesystemService.read(item.audioFileName);
    // const audio = new FileData<any>();
    // audio.filePath = item.audioFileName;

    // const image = new FileData<any>(item.imageFileName);
    const image = await this.filesystemService.read(item.imageFileName);
    // image.filePath = item.imageFileName;

    return {
      ...item,
      audio,
      image,
    };
  }

  private async persistImage(
    id: number,
    image: FileData<Photo>
  ): Promise<string> {
    // TODO: get extension with the FileData class
    // TODO: Compress the image (in the component)
    image.filePath = `${ITEMS_FOLDER}/${id}/${Date.now()}.png`;
    await this.filesystemService.writeFileData(image);
    return image.filePath;
  }

  private async persistAudio(
    id: number,
    image: FileData<any>
  ): Promise<string> {
    // TODO: get extension with the FileData class
    image.filePath = `${ITEMS_FOLDER}/${id}/${Date.now()}.ogg`;
    await this.filesystemService.writeFileData(image);
    return image.filePath;
  }
}
