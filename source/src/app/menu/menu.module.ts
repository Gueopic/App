import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollModule } from 'src/core/components/virtual-scroll/virtual-scroll.module';
import { SponsorsFooterModule } from '../shared/components/sponsors-footer/sponsors-footer.module';
import { ItemFilterModule } from './../../core/pipes/filters/item-filter/item-filter.module';
import { VerbFilterModule } from './../../core/pipes/filters/verb-filter/verb-filter.module';
import { EditObjectModule } from './components/edit-object/edit-object.module';
import { EditVerbModule } from './components/edit-verb/edit-verb.module';
import { LanguageSelectorPage } from './language-selector/language-selector.page';
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
    VerbFilterModule,
    ItemFilterModule,
    SponsorsFooterModule,
  ],
  declarations: [MenuPage, LanguageSelectorPage],
})
export class MenuPageModule {}
