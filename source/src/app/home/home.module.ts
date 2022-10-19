import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollModule } from 'src/core/components/virtual-scroll/virtual-scroll.module';
import { SponsorsFooterModule } from '../shared/components/sponsors-footer/sponsors-footer.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HomePageRoutingModule,
    VirtualScrollModule,
    SponsorsFooterModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
