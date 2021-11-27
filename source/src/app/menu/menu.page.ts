import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemWithFilesModel } from 'src/core/models/item-with-files.model';
import { VerbWithFilesModel } from 'src/core/models/verb-with-files.model';
import { AudioService } from 'src/core/services/audio.service';
import { ItemsStateService } from 'src/core/state/items.state';
import { SettingsStateService } from 'src/core/state/settings.state';
import { VerbsStateService } from 'src/core/state/verbs.state';
import { EditObjectComponent } from './components/edit-object/edit-object.component';
import { EditVerbComponent } from './components/edit-verb/edit-verb.component';
@Component({
  selector: 'gueo-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit, OnDestroy {
  constructor(
    public itemsStateService: ItemsStateService,
    public verbsStateService: VerbsStateService,
    public settingsStateService: SettingsStateService,
    public modalController: ModalController,
    private audioService: AudioService,
  ) {}

  ngOnInit() {
    this.itemsStateService.loadAll();
    this.verbsStateService.loadAll();
    this.settingsStateService.loadAll(true);
  }

  ngOnDestroy() {
    this.settingsStateService.persistChanges();
  }

  trackByVerb(index, item: VerbWithFilesModel) {
    return item.id;
  }
  trackByItem(index, item: ItemWithFilesModel) {
    return item.id;
  }

  deleteVerb(verb: VerbWithFilesModel) {
    this.verbsStateService.remove(verb);
  }

  deleteItem(item: ItemWithFilesModel) {
    this.itemsStateService.remove(item);
  }

  reproduceSound(item: ItemWithFilesModel | VerbWithFilesModel): void {
    this.audioService.playAudioFile(item.audio);
  }

  async openVerbModal(verb?: VerbWithFilesModel): Promise<void> {
    const modal = await this.modalController.create({
      component: EditVerbComponent,
      cssClass: 'gueo-edit-verb--custom',
      componentProps: {
        verb,
      },
      backdropDismiss: false,
      swipeToClose: false,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data !== undefined) {
      if (verb) {
        this.verbsStateService.update(data);
      } else {
        this.verbsStateService.insert(data);
      }
    }
  }

  async openItemModal(item?: ItemWithFilesModel): Promise<void> {
    const modal = await this.modalController.create({
      component: EditObjectComponent,
      cssClass: 'gueo-edit-object--custom',
      componentProps: {
        item,
      },
      backdropDismiss: false,
      swipeToClose: false,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data !== undefined) {
      if (item) {
        this.itemsStateService.update(data);
      } else {
        this.itemsStateService.insert(data);
      }
    }
  }
}
