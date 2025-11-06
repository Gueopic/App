import { Component, OnInit } from '@angular/core';
import { ItemsDatabaseService } from 'src/core/database/items-database.service';
import { VerbsDatabaseService } from 'src/core/database/verbs-database.service';
import { ItemWithFilesModel } from 'src/core/models/item-with-files.model';
import { VerbWithFilesModel } from 'src/core/models/verb-with-files.model';
import { AudioServiceMock } from 'src/core/services/mocks/audio.service.mock';
import { CameraServiceMock } from 'src/core/services/mocks/camera.service.mock';
import { ItemsStateService } from 'src/core/state/items.state';
import { SettingsStateService } from 'src/core/state/settings.state';
import { VerbsStateService } from 'src/core/state/verbs.state';

@Component({
    selector: 'gueo-playground-states',
    templateUrl: 'playground-states.page.html',
    standalone: false
})
export class PlaygroundStatesPage implements OnInit {
  constructor(
    private settingsState: SettingsStateService,
    public itemsState: ItemsStateService,
    public verbsState: VerbsStateService,
    private audioMocked: AudioServiceMock,
    private cameraMocked: CameraServiceMock,
    private itemsDatabase: ItemsDatabaseService,
    private verbsDatabase: VerbsDatabaseService,
  ) {}

  ngOnInit() {
    this.refreshData();
    this.settingsState.loadAll(true);
    // this.settingsState.elements$.subscribe(() => {
    //   console.log('BEFORE', this.settingsState.language);
    //   this.settingsState.language = 'test';
    //   console.log('AFTER', this.settingsState.language);
    //   this.settingsState.persistChanges();
    //   this.settingsState.language$.subscribe(
    //     (language) => {
    //       console.log('languageasync', language);
    //     }
    //   );
    // });
  }

  async clearDB(): Promise<void> {
    await this.itemsDatabase.empty();
    await this.verbsDatabase.empty();
    await this.refreshData();
  }

  async insertDefaultData(): Promise<void> {
    for (let n = 0; n < 5; n++) {
      try {
        await this.insertVerb();
      } catch (err) {
        console.error(err);
      }
    }
    for (let n = 0; n < 41; n++) {
      try {
        await this.insertItem();
      } catch (err) {
        console.error(err);
      }
    }
  }

  // #region Verbs State test
  async insertVerb(verb?: VerbWithFilesModel): Promise<void> {
    if (!verb) {
      verb = (await {
        text: `Verb`,
        audio: await this.audioMocked.stopRecording(),
      }) as VerbWithFilesModel;
    }
    await this.verbsState.insert(verb);
  }

  async updateVerb(verb: VerbWithFilesModel): Promise<void> {
    verb.text = `Updated at ${Date.now()}`;
    await this.verbsState.update(verb);
  }

  async deleteVerb(verb: VerbWithFilesModel): Promise<void> {
    await this.verbsState.remove(verb);
  }
  // #endregion

  // #region Items State test
  async insertItem(item?: ItemWithFilesModel): Promise<void> {
    if (!item) {
      item = {
        text: `Item`,
        audio: await this.audioMocked.stopRecording(),
        image: await this.cameraMocked.takePicture(),
      } as ItemWithFilesModel;
    }

    await this.itemsState.insert(item);
  }

  async updateItem(item): Promise<void> {
    item.text = `Updated at ${Date.now()}`;
    await this.itemsState.update(item);
  }

  async deleteItem(item): Promise<void> {
    await this.itemsState.remove(item);
  }
  // #endregion

  private async refreshData() {
    this.verbsState.loadAll(true);
    this.itemsState.loadAll(true);
  }
}
