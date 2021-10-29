import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageElement } from 'src/core/database/core/storage.elements';
import { ItemWithFilesModel } from 'src/core/models/item-with-files.model';
import { VerbWithFilesModel } from 'src/core/models/verb-with-files.model';
import { ItemsStateService } from 'src/core/state/items.state';
import { VerbsStateService } from 'src/core/state/verbs.state';
import { DataService, ImgText } from 'src/services/data.service';
import { CreateObjectComponent } from './components/create-object/create-object.component';
import { EditObjectComponent } from './components/edit-object/edit-object.component';

@Component({
  selector: 'gueo-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {
  constructor(
    public itemsStateService: ItemsStateService,
    public verbsStateService: VerbsStateService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.itemsStateService.loadAll();
  }

  deleteVerb(id: VerbWithFilesModel) {
    // this.dataService.deletePhraseObject(id);
  }

  deleteItem(id: ItemWithFilesModel) {
    // this.dataService.deleteObject(id);
  }

  trackByItem(index, item: ItemWithFilesModel) {
    return item.id;
  }
  trackByVerb(index, item: VerbWithFilesModel) {
    return item.id;
  }

  async openEditModal(item: ItemWithFilesModel): Promise<void> {
    const modal = await this.modalController.create({
      component: EditObjectComponent,
      cssClass: 'gueo-edit-object--custom',
      componentProps: {
        item,
      },
    });
    return await modal.present();
  }

  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateObjectComponent,
      cssClass: 'gueo-edit-object--custom',
    });
    return await modal.present();
  }
}
