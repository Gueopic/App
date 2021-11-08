import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/core/database/core/storage.service';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // TODO: Refactor to a new screen
  hasSelectedLang: boolean;
  languageList: string[];

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    public appTranslateService: AppTranslateService
  ) {}

  ngOnInit() {
    this.platform.ready().then((res) => {
      console.debug('Platform initialized:', res);
      this.bootstrap();
    });
  }

  changeLang(lang: string) {
    this.appTranslateService.setCurrent(lang);
    this.hasSelectedLang = true;
  }

  private async bootstrap(): Promise<void> {
    await this.storageService.init();
    await this.loadCurrentLanguage();
    await SplashScreen.hide();
  }

  private async loadCurrentLanguage(): Promise<void> {
    this.hasSelectedLang = !!(await this.appTranslateService.getCurrent());
    this.languageList = this.appTranslateService.availableLangs();
    if (!this.hasSelectedLang && this.languageList?.length === 1) {
      this.appTranslateService.setCurrent(this.languageList[0]);
      this.hasSelectedLang = true;
    }
  }
}
