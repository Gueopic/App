import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageElement } from 'src/core/database/core/storage.elements';
import { DataService, ImgText } from 'src/services/data.service';
import { EditObjectComponent } from './components/edit-object.component';

@Component({
  selector: 'gueo-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {
  constructor(
    public dataService: DataService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  deletePhraseObject(id: number) {
    this.dataService.deletePhraseObject(id);
  }

  deleteObject(id: number) {
    this.dataService.deleteObject(id);
  }

  trackById(index, item: StorageElement) {
    return item.id;
  }

  async openModal(item: ImgText): Promise<void> {
    const modal = await this.modalController.create({
      component: EditObjectComponent,
      cssClass: 'gueo-edit-object--custom',
      componentProps: {
        item,
      },
    });
    return await modal.present();
  }
}
