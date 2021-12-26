import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { BehaviorSubject, combineLatest, from, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ItemsDatabaseService } from '../database/items-database.service';
import { FileData } from '../models/file-data.model';
import { ItemWithFilesModel } from '../models/item-with-files.model';
import { ItemModel } from '../models/item.model';
import { BASE_FOLDER, FilesystemService } from '../services/filesystem.service';
import { StateFromDB, StateFromDBService } from './core/state-db.base';

class State extends StateFromDB<ItemModel> {
  itemsWithFiles = new BehaviorSubject<ItemWithFilesModel[]>(null);
  itemsWithFilesIndexed: { [id: string]: ItemWithFilesModel } = {};
  loaderItemsWithFiles = new BehaviorSubject<boolean>(true);
}

export const ITEMS_FOLDER = `${BASE_FOLDER}items`;

@Injectable({
  providedIn: 'root',
})
export class ItemsStateService extends StateFromDBService<
  ItemModel,
  ItemsDatabaseService
> {
  state = new State();

  readonly itemsWithFiles$: Observable<ItemWithFilesModel[]> =
    this.state.itemsWithFiles.asObservable();

  readonly loaderItemsWithFiles$: Observable<boolean> = combineLatest([
    this.loaderElements$,
    this.state.loaderItemsWithFiles,
  ]).pipe(map((loaders) => loaders.some((l) => !!l)));

  constructor(
    private itemsDatabase: ItemsDatabaseService,
    private filesystemService: FilesystemService,
  ) {
    super(itemsDatabase);
    this.itemsChangeListener();
  }

  async insert(element: ItemWithFilesModel): Promise<void> {
    try {
      // Save the files
      const nextId = await this.dbService.getNextId();
      if (element.image) {
        element.imageFileName = await this.persistImage(nextId, element.image);
      }
      if (element.audio) {
        element.audioFileName = await this.persistAudio(nextId, element.audio);
      }

      // Store in the database
      const cleanModel = this.mapToModel(element);
      cleanModel.audioLength = element.audio?.originalFile?.value.msDuration;
      await super.insert(cleanModel);
    } catch (e) {
      console.error(e);
    }
  }

  async update(element: ItemWithFilesModel): Promise<void> {
    const original = { ...this.state.itemsWithFilesIndexed[element.id] };
    original.text = element.text;

    // Save the files if changed
    if (element.image?.originalFile) {
      if (original.imageFileName) {
        this.filesystemService.delete(original.imageFileName);
      }
      original.imageFileName = await this.persistImage(
        original.id,
        element.image,
      );
    }
    if (element.audio?.originalFile) {
      if (original.audioFileName) {
        this.filesystemService.delete(original.audioFileName);
      }
      original.audioFileName = await this.persistAudio(
        original.id,
        element.audio,
      );
    }

    const cleanModel = this.mapToModel(original);
    await super.update(cleanModel);
  }

  async remove(element: ItemWithFilesModel): Promise<void> {
    if (element.imageFileName) {
      this.filesystemService.delete(element.imageFileName);
    }
    if (element.audioFileName) {
      this.filesystemService.delete(element.audioFileName);
    }

    await super.remove(element);
  }

  private mapToModel(element: ItemWithFilesModel): ItemModel {
    return {
      id: element.id,
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
        switchMap((items) => {
          this.state.loaderItemsWithFiles.next(true);
          return from(this.appendFileDataToItems(items));
        }),
        tap((itemsWithFiles) => {
          this.state.itemsWithFiles.next(itemsWithFiles);
          this.state.loaderItemsWithFiles.next(false);
        }),
      )
      .subscribe();
  }

  /**
   * Create a new array with all items with the corresponding files attached
   * This will use "itemsWithFilesIndexed" to improve performance
   *
   * @param newItems New items retrieved
   */
  private async appendFileDataToItems(
    newItems: ItemModel[],
  ): Promise<ItemWithFilesModel[]> {
    if (!newItems) {
      return [];
    }
    const currentItems = this.state.itemsWithFilesIndexed;
    const mappedItems: ItemWithFilesModel[] = [];

    for (const item of newItems) {
      let currentItem: ItemWithFilesModel = currentItems[item.id];
      currentItems[item.id] = currentItem = await this.createItemData(
        item,
        currentItem,
      );
      mappedItems.push(currentItem);
    }

    return mappedItems;
  }

  private async createItemData(
    item: ItemModel,
    oldItemInstance: ItemWithFilesModel,
  ): Promise<ItemWithFilesModel> {
    const itemWithFiles: ItemWithFilesModel = {
      ...oldItemInstance,
      ...item,
      audio: null,
      image: null,
    } as ItemWithFilesModel;

    try {
      // Update the audio if changed
      if (item.audioFileName !== oldItemInstance?.audioFileName) {
        itemWithFiles.audio = item.audioFileName
          ? await this.filesystemService.read(item.audioFileName)
          : null;
      }
    } catch (ex) {}

    try {
      // Update the image if changed
      if (item.imageFileName !== oldItemInstance?.imageFileName) {
        itemWithFiles.image = item.imageFileName
          ? await this.filesystemService.read(item.imageFileName)
          : null;
      }
    } catch (ex) {}

    return itemWithFiles;
  }

  private async persistImage(
    id: number | string,
    image: FileData<Photo>,
  ): Promise<string> {
    // TODO: get extension with the FileData class
    const destinationFilePath = `${ITEMS_FOLDER}/${id.toString()}/${Date.now()}.png`;
    await this.filesystemService.writeFileData(image, destinationFilePath);
    return image.filePath;
  }

  private async persistAudio(
    id: number | string,
    audio: FileData<any>,
  ): Promise<string> {
    // TODO: get extension with the FileData class
    const destinationFilePath = `${ITEMS_FOLDER}/${id.toString()}/${Date.now()}.ogg`;
    await this.filesystemService.writeFileData(audio, destinationFilePath);
    return audio.filePath;
  }
}
