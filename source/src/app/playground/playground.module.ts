import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollModule } from 'src/components/virtual-scroll/virtual-scroll.module';
import { InputCameraModule } from 'src/core/components/input-camera/input-camera.module';
import { InputRecordAudioModule } from 'src/core/components/input-record-audio/input-record-audio.module';
import { PlaygroundHomePage } from './playground-home.page';
import { PlaygroundPageRoutingModule } from './playground-routing.module';
import { PlaygroundComponentsPage } from './views/components/playground-components.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PlaygroundPageRoutingModule,
    VirtualScrollModule,

    InputCameraModule,
    InputRecordAudioModule,
  ],
  declarations: [PlaygroundHomePage, PlaygroundComponentsPage],
})
export class PlaygroundPageModule {}
