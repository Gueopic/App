import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollModule } from 'src/components/virtual-scroll/virtual-scroll.module';
import { PlaygroundHomePage } from './playground-home.page';
import { PlaygroundPageRoutingModule } from './playground-routing.module';
import { PlaygroundComponentsPage } from './views/components/playground-components.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PlaygroundPageRoutingModule,
    VirtualScrollModule,
  ],
  declarations: [PlaygroundHomePage, PlaygroundComponentsPage],
})
export class PlaygroundPageModule {}
