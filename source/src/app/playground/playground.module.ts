import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollModule } from 'src/components/virtual-scroll/virtual-scroll.module';
import { InputCameraModule } from 'src/core/components/input-camera/input-camera.module';
import { InputRecordAudioModule } from 'src/core/components/input-record-audio/input-record-audio.module';
import { DomSanitizePipeModule } from 'src/core/dom-sanitize-pipe/dom-sanitize-pipe.module';
import { AudioServiceMock } from 'src/core/services/mocks/audio.service.mock';
import { CameraServiceMock } from 'src/core/services/mocks/camera.service.mock';
import { PlaygroundHomePage } from './playground-home.page';
import { PlaygroundPageRoutingModule } from './playground-routing.module';
import { PlaygroundComponentsPage } from './views/components/playground-components.page';
import { PlaygroundDatabasePage } from './views/database/playground-database.page';
import { PlaygroundStatesPage } from './views/states/playground-states.page';

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

    DomSanitizePipeModule,
  ],
  declarations: [PlaygroundHomePage, PlaygroundComponentsPage, PlaygroundStatesPage, PlaygroundDatabasePage],
  providers: [
    AudioServiceMock,
    CameraServiceMock,
  ]
})
export class PlaygroundPageModule {}
