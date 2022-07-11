import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemWithFilesModel } from '../../core/models/item-with-files.model';
import { VerbWithFilesModel } from '../../core/models/verb-with-files.model';
import { LanguageListI } from '../../core/modules/translate/translate.module';
import { AppTranslateService } from '../../core/modules/translate/translate.service';
import { AudioService } from '../../core/services/audio.service';
import { ItemsStateService } from '../../core/state/items.state';
import { SettingsStateService } from '../../core/state/settings.state';
import { VerbsStateService } from '../../core/state/verbs.state';
import { EditObjectComponent } from './components/edit-object/edit-object.component';
import { EditVerbComponent } from './components/edit-verb/edit-verb.component';
import { version } from '../../../package.json';
import { ElementWithAudio } from 'src/core/models/element-with-audio.interface';
@Component({
  selector: 'gueo-menu',
  templateUrl: './menu.page.html',
  //styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit, OnDestroy {
  public languageList: LanguageListI[];
  public version: string = version;

  constructor(
    public itemsStateService: ItemsStateService,
    public verbsStateService: VerbsStateService,
    public settingsStateService: SettingsStateService,
    public modalController: ModalController,
    public appTranslateService: AppTranslateService,
    public audioService: AudioService,
  ) {}

  ngOnInit() {
    this.itemsStateService.loadAll();
    this.verbsStateService.loadAll();
    this.settingsStateService.loadAll(true);
    this.languageList = this.appTranslateService.availableLangs();
  }

  ngOnDestroy() {
    this.settingsStateService.persistChanges();
  }

  trackByVerb(index, item: VerbWithFilesModel) {
    return item.id;
  }
  trackByLang(index, lang: LanguageListI) {
    return lang.key;
  }

  deleteVerb(verb: VerbWithFilesModel) {
    this.verbsStateService.remove(verb);
  }

  deleteItem(item: ItemWithFilesModel) {
    this.itemsStateService.remove(item);
  }

  reproduceSound(item: ElementWithAudio): void {
    this.audioService.reproduceSound(item);
  }

  changeLang(lang: string) {
    this.appTranslateService.setCurrent(lang);
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
