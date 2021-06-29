import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
})
export class VirtualScrollComponent {
  @Input() list: any[];
  numOfColumns = 6;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    // TODO: Set breakpoints
    this.numOfColumns = window.innerWidth > 767 ? 4 : 6;
  }
}
