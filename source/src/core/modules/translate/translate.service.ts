import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_SUPPORT } from './translate.module';

@Injectable({
    providedIn: 'root'
})
export class AppTranslateService {
    constructor(
        private translate: TranslateService,
    ) { }
    set current(lang: string) {
        // TODO: Save to Storage.
        this.translate.setDefaultLang(lang);
    }
    get current() {
        // TODO: Retrieve to Storage.
        return this.translate.defaultLang;
    }

    init(): Promise<string> {
        this.translate.addLangs(LANGUAGE_SUPPORT.map(lang => lang.key));

        // TODO: Retrieve default to Storage.
        const storageLang = null;
        return new Promise((resolve) => {
            if (storageLang) {
                this.current = storageLang;
                resolve(storageLang);
            } else {
                const userLang = this.translate.getLangs().find(lang => lang === this.translate.getBrowserLang());

                if (userLang) {
                    this.current = userLang;
                }

                setTimeout(() => {
                    resolve(this.translate.getDefaultLang());
                }, 101);
            }
        });
    }
}
