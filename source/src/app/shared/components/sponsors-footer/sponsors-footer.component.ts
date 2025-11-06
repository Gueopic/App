import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-sponsors-footer',
    templateUrl: './sponsors-footer.component.html',
    styleUrls: ['./sponsors-footer.component.scss'],
    standalone: false
})
export class SponsorsFooterComponent {
  readonly isNative = this.platform.is('hybrid');
  constructor(readonly platform: Platform) {}
}
