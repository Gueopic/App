import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export const translateLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json');

export const LANGUAGE_SUPPORT = [
    { key: 'es', label: 'ES' },
    { key: 'en', label: 'EN' },
    { key: 'ca', label: 'CA' },
];

@NgModule({
    imports: [
        TranslateModule.forRoot({
            defaultLanguage: 'es',
            loader: {
                provide: TranslateLoader,
                useFactory: (translateLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        TranslateModule
    ]
})
export class TranslateLoaderModule { }
