import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { SettingsStateService } from 'src/core/state/settings.state';
import { sleep } from 'src/core/utils/promises.utils';
import { LanguageListI, LANGUAGE_SUPPORT } from './translate.module';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  constructor(
    private translate: TranslateService,
    public settingsStateService: SettingsStateService,
  ) {}

  availableLangs(): LanguageListI[] {
    return LANGUAGE_SUPPORT;
    // return this.translate.langs;
  }

  async setCurrent(lang: string): Promise<void> {
    this.translate.use(lang);
    this.settingsStateService.language = lang;
    return await this.settingsStateService.persistChanges();
  }

  async getCurrent(): Promise<string> {
    return await this.settingsStateService.language$.pipe(take(1)).toPromise();
  }

  async init(): Promise<string> {
    this.translate.addLangs(LANGUAGE_SUPPORT.map((lang) => lang.key));

    const storageLang = await this.getCurrent();
    if (storageLang) {
      this.translate.use(storageLang);
      this.settingsStateService.language = storageLang;
      return storageLang;
    } else {
      const userLang = this.translate
        .getLangs()
        .find((lang) => lang === this.translate.getBrowserLang());

      if (userLang) {
        this.setCurrent(userLang);
        return userLang;
      } else {
        await sleep(101);
        return this.translate.getDefaultLang();
      }
    }
  }
}
