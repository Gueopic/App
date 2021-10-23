import { Component, OnInit } from '@angular/core';
import { ItemsDatabaseService } from 'src/core/database/items-database.service';
import { VerbsDatabaseService } from 'src/core/database/verbs-database.service';
import { ItemModel } from 'src/core/models/item.mode';
import { VerbModel } from 'src/core/models/verb.model';

@Component({
  selector: 'gueo-playground-database',
  templateUrl: 'playground-database.page.html',
})
export class PlaygroundDatabasePage implements OnInit {
  verbs: VerbModel[] = [];
  items: ItemModel[] = [];

  constructor(
    private itemsDatabase: ItemsDatabaseService,
    private verbsDatabase: VerbsDatabaseService
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  async clearDB(): Promise<void> {
    await this.itemsDatabase.empty();
    await this.verbsDatabase.empty();
    await this.refreshData();
  }

  async insertDefaultData(): Promise<void> {
    for (let n = 0; n < 5; n++) {
      await this.insertVerb();
    }
    for (let n = 0; n < 15; n++) {
      await this.insertItem();
    }
    await this.refreshData();
  }

  // #region Verbs Database test
  async insertVerb(): Promise<void> {
    const nextId = await this.verbsDatabase.getNextId();
    await this.verbsDatabase.insert([
      {
        text: `Verb num ${nextId + 1}`,
        audioFileName: `test_${nextId}.ogg`,
        audioLength: 100,
      } as VerbModel,
    ]);
    this.refreshData();
  }

  async updateVerb(position = this.verbs.length - 1): Promise<void> {
    if (!this.verbs[position]) {
      return;
    }

    const latestVerb = this.verbs[position];
    latestVerb.text = `Updated at ${Date.now()}`;
    await this.verbsDatabase.update([latestVerb]);
    this.refreshData();
  }

  async deleteVerb(position = this.verbs.length - 1): Promise<void> {
    if (!this.verbs[position]) {
      return;
    }

    const latestVerb = this.verbs[position];
    await this.verbsDatabase.remove([latestVerb]);
    this.refreshData();
  }
  // #endregion

  // #region Items Database test
  async insertItem(): Promise<void> {
    const nextId = await this.itemsDatabase.getNextId();
    await this.itemsDatabase.insert([
      {
        text: `Item num ${nextId + 1}`,
        imageFilename: `test_${nextId}.jpg`,
        audioFileName: `test_${nextId}.ogg`,
        audioLength: 100,
      } as ItemModel,
    ]);
    this.refreshData();
  }

  async updateItem(position = this.items.length - 1): Promise<void> {
    if (!this.items[position]) {
      return;
    }

    const latestItem = this.items[position];
    latestItem.text = `Updated at ${Date.now()}`;
    await this.itemsDatabase.update([latestItem]);
    this.refreshData();
  }

  async deleteItem(position = this.items.length - 1): Promise<void> {
    if (!this.items[position]) {
      return;
    }

    const latestItem = this.items[position];
    await this.itemsDatabase.remove([latestItem]);
    this.refreshData();
  }
  // #endregion

  private async refreshData() {
    this.verbs = await this.verbsDatabase.getAll();
    this.items = await this.itemsDatabase.getAll();
  }
}
