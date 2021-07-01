import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements OnInit, OnChanges {
  @Input() list: any[];
  @Input() rowSizePx: number = 300;
  itemsPerRow: number;
  colSize: number;
  groupList: any[];

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    const newItemPerRow = window.innerWidth > 767 ? 3 : 2;
    if (newItemPerRow !== this.itemsPerRow) {
      this.itemsPerRow = newItemPerRow;
      this.colSize = 12 / this.itemsPerRow;
      this.reGroupList();
    }
  }

  ngOnInit() {
    this.getScreenSize();
    this.reGroupList();
  }

  ngOnChanges(change: any) {
    if (change.list) {
      this.reGroupList();
    }
  }

  reGroupList() {
    this.groupList = [];
    let currentGroup = [];
    let col = 0;

    for (const element of this.list) {
      currentGroup.push(element);
      col++;
      if (col >= this.itemsPerRow) {
        this.groupList.push(currentGroup);
        col = 0;
        currentGroup = [];
      }
    }

    if (currentGroup.length) {
      this.groupList.push(currentGroup);
    }
  }
}
