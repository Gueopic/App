import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export const translateLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(http, 'assets/i18n/', '.json');

export interface LanguageListI {
  key: string;
  label: string;
}

export const LANGUAGE_SUPPORT: LanguageListI[] = [
  { key: 'es', label: 'Castellano' },
  { key: 'en', label: 'English' },
  { key: 'ca', label: 'Català' },
];

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class TranslateLoaderModule {}
