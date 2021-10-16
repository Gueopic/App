import { Injectable } from '@angular/core';
import { SettingModel } from '../models/setting.model';
import { AbstractDatabaseService } from './core/abstract-database.service';
import { StorageService } from './core/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsDatabaseService extends AbstractDatabaseService<SettingModel> {
  protected tableName = 'verbs';

  constructor(protected dbService: StorageService) {
    super(dbService);
  }

  async insert(elements: SettingModel[]): Promise<void> {
    this.update(elements);
  }

  async update(elements: SettingModel[]): Promise<void> {
    for (const element of elements) {
      if (!element.id) {
        throw new Error(`No key provided to the setting with value ${element.value}`);
      }
    }
    return await this.dbService.updateElements(this.tableName, elements);
  }
}
