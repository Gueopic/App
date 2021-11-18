import { Injectable } from '@angular/core';
import { SettingModel } from '../models/setting.model';
import { AbstractDatabaseService } from './core/abstract-database.service';
import { StorageService } from './core/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsDatabaseService extends AbstractDatabaseService<SettingModel> {
  protected tableName = 'settings'

  constructor(protected dbService: StorageService) {
    super(dbService);
    this.dbService.autoIncremental = false;
  }

  async getValue(id: string, defaultValue?: string): Promise<string> {
    const element = (await this.dbService.getElement(
      this.tableName,
      id
    )) as SettingModel;
    return element?.value || defaultValue;
  }

  async setValue(id: string, value: string): Promise<SettingModel[]> {
    return await this.dbService.updateElements(this.tableName, [
      {
        id,
        value,
      },
    ]);
  }

  async insert(elements: SettingModel[]): Promise<SettingModel[]> {
    return await this.update(elements);
  }

  async update(elements: SettingModel[]): Promise<SettingModel[]> {
    for (const element of elements) {
      if (!element.id) {
        throw new Error(
          `No key provided to the setting with value ${element.value}`
        );
      }
    }
    return await this.dbService.updateElements(this.tableName, elements);
  }
}
