import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/core/models/file-data.model';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';
import { AudioService } from 'src/core/services/audio.service';
import { ItemsStateService } from 'src/core/state/items.state';
import { VerbsStateService } from 'src/core/state/verbs.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gueo-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isProduction = environment.production;

  constructor(
    public appTranslateService: AppTranslateService,
    public verbsState: VerbsStateService,
    public itemsState: ItemsStateService,
    private audioService: AudioService,
  ) {}

  ngOnInit() {
    this.init();
  }

  reproduceAudio(audio: FileData<any>): void {
    this.audioService.playAudioFile(audio);
  }

  private async init(): Promise<void> {
    await this.verbsState.loadAll();
    await this.itemsState.loadAll();
  }
}
