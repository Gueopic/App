import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from 'src/core/modules/translate/translate.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public appTranslateService: AppTranslateService,
  ) {}

  ngOnInit() {
  }

}
