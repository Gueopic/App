import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/core/models/file-data.model';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';
import { AudioService } from 'src/core/services/audio.service';
import { ItemsStateService } from 'src/core/state/items.state';
import { SettingsStateService } from 'src/core/state/settings.state';
import { VerbsStateService } from 'src/core/state/verbs.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'gueo-home',
  templateUrl: 'home.page.html',
  //styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isProduction = environment.production;
  footerHidden = false;

  constructor(
    public appTranslateService: AppTranslateService,
    public settingsStateService: SettingsStateService,
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

  ionViewWillEnter() {
    // Ionic hack for virtual scroll
    window.dispatchEvent(new Event('resize'));
  }

  // https://stackoverflow.com/questions/56347694/how-to-detect-scroll-direction-in-ionic-4
  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if (event.detail.deltaY > 0 && this.footerHidden) {
      return;
    }
    if (event.detail.deltaY < 0 && !this.footerHidden) {
      return;
    }
    if (event.detail.deltaY > 0) {
      this.footerHidden = true;
    } else {
      this.footerHidden = false;
    }
  }

  private async init(): Promise<void> {
    await this.verbsState.loadAll();
    await this.itemsState.loadAll();
  }
}
