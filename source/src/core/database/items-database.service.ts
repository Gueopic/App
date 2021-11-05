import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { AbstractDatabaseService } from './core/abstract-database.service';
import { StorageService } from './core/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsDatabaseService extends AbstractDatabaseService<ItemModel> {
  protected tableName = 'items';

  constructor(protected dbService: StorageService) {
    super(dbService);
  }
}
