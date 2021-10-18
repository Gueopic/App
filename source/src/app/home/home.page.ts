import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';
import { environment } from 'src/environments/environment';
import { ImgText } from 'src/services/data.service';
import { MOCKED_DATA } from 'src/utils/global-variables.utils';

@Component({
  selector: 'gueo-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  imgs: ImgText[] = MOCKED_DATA;

  isProduction = environment.production;

  constructor(
    public appTranslateService: AppTranslateService,
  ) {}

  ngOnInit() {
  }

}
