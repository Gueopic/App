import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsDatabaseService } from 'src/core/database/settings-database.service';
import { sleep } from 'src/core/utils/promises.utils';
import { LANGUAGE_SUPPORT } from './translate.module';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  constructor(
    private translate: TranslateService,
    private settingsDatabase: SettingsDatabaseService
  ) {}

  availableLangs(): string[] {
    return this.translate.langs;
  }

  async setCurrent(lang: string): Promise<void> {
    console.debug('Language changed to:', lang);
    this.translate.setDefaultLang(lang);
    return await this.settingsDatabase.setValue('lang', lang);
  }

  async getCurrent(): Promise<string> {
    const lang = await this.settingsDatabase.getValue(
      'lang',
      this.translate.defaultLang
    );
    console.debug('Load language:', lang);
    return lang;
  }

  async init(): Promise<string> {
    this.translate.addLangs(LANGUAGE_SUPPORT.map((lang) => lang.key));

    const storageLang = await this.getCurrent();
    if (storageLang) {
      await this.setCurrent(storageLang);
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
