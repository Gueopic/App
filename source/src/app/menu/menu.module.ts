import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollModule } from 'src/core/components/virtual-scroll/virtual-scroll.module';
import { EditObjectModule } from './components/edit-object/edit-object.module';
import { EditVerbModule } from './components/edit-verb/edit-verb.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    MenuPageRoutingModule,
    EditVerbModule,
    EditObjectModule,
    VirtualScrollModule,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
