import { Injectable } from '@angular/core';
import { VerbModel } from '../models/verb.model';
import { AbstractDatabaseService } from './core/abstract-database.service';
import { StorageService } from './core/storage.service';

@Injectable({
  providedIn: 'root',
})
export class VerbsDatabaseService extends AbstractDatabaseService<VerbModel> {
  protected tableName = 'verbs';

  constructor(protected dbService: StorageService) {
    super(dbService);
  }
}
