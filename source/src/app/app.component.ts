import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/core/database/core/storage.service';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { SettingsStateService } from 'src/core/state/settings.state';
import { LanguageListI } from 'src/core/modules/translate/translate.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  // TODO: Refactor to a new screen
  hasSelectedLang: boolean;
  languageList: LanguageListI[];

  constructor(
    public settingsStateService: SettingsStateService,
    private platform: Platform,
    private storageService: StorageService,
    public appTranslateService: AppTranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.platform.ready().then((res) => {
      console.debug('Platform initialized:', res);
      this.bootstrap();
    });
  }

  private async bootstrap(): Promise<void> {
    await this.storageService.init();
    await this.settingsStateService.loadAll();
    await this.appTranslateService.init();
    await this.loadCurrentLanguage();
    await SplashScreen.hide();
  }

  private async loadCurrentLanguage(): Promise<void> {
    const currentLang = await this.appTranslateService.getCurrent();
    this.hasSelectedLang = !!currentLang;
    this.languageList = this.appTranslateService.availableLangs();
    // Auto select language if only 1 available
    if (!this.hasSelectedLang) {
      if (this.languageList?.length === 1) {
        this.appTranslateService.setCurrent(this.languageList[0].key);
        this.hasSelectedLang = true;
      } else {
        this.router.navigate(['/menu', 'language']);
      }
    }
  }
}
