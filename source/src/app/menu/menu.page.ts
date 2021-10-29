import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemWithFilesModel } from 'src/core/models/item-with-files.model';
import { VerbWithFilesModel } from 'src/core/models/verb-with-files.model';
import { ItemsStateService } from 'src/core/state/items.state';
import { VerbsStateService } from 'src/core/state/verbs.state';
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

    // DEBUG PURPOSES:
    this.openItemModal();
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

  async openItemModal(item?: ItemWithFilesModel): Promise<void> {
    const modal = await this.modalController.create({
      component: EditObjectComponent,
      cssClass: 'gueo-edit-object--custom',
      componentProps: {
        item,
      },
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
