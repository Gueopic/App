import { Component } from '@angular/core';
import { ImgText } from 'src/services/data.service';
import { MOCKED_DATA } from 'src/utils/global-variables.utils';

@Component({
  selector: 'gueo-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgs: ImgText[] = MOCKED_DATA;
}
