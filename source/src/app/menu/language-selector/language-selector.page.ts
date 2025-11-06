import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';

@Component({
    selector: 'gueo-language-selector',
    templateUrl: './language-selector.page.html',
    styleUrls: ['./language-selector.page.scss'],
    standalone: false
})
export class LanguageSelectorPage implements OnInit {
  constructor(
    public appTranslateService: AppTranslateService,
    private router: Router,
  ) {}

  ngOnInit() {}

  changeLang(lang: string) {
    this.appTranslateService.setCurrent(lang);
    this.router.navigate(['/']);
  }
}
