import { Component } from '@angular/core';
import { Imgtext } from 'src/interfaces/global.interfaces';
import { MOCKED_DATA } from 'src/utils/global-variables.utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgs: Imgtext[] = MOCKED_DATA;
  constructor() {}
}
