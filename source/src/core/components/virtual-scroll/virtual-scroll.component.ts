import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'gueo-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollComponent implements OnInit, OnChanges {
  @Input() maxWidth = 767;
  @Input() list: any[];
  @Input() rowSizePx = 300;
  @Input() isLoading = false;

  @ContentChild('itemTemplate', { static: false })
  itemTemplate: TemplateRef<any>;
  @ContentChild('noContentTemplate', { static: false })
  noContentTemplate: TemplateRef<any>;

  itemsPerRow: number;
  colSize: number;
  groupList: any[];
  skeletonFakePositions = new Array(10).fill(null);

  constructor(private ngZone: NgZone) {}

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    const screenWidth = (event?.target as any)?.innerWidth || window.innerWidth;
    const newItemPerRow = Math.min(
      Math.max(1, Math.floor(screenWidth / this.maxWidth)),
      12
    );
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
    this.ngZone.runOutsideAngular(() => {
      this.groupList = [];
      const newGroupList = [];
      let currentGroup = [];
      let col = 0;

      if (this.list?.length > 0) {
        for (const element of this.list) {
          currentGroup.push(element);
          col++;
          if (col >= this.itemsPerRow) {
            newGroupList.push(currentGroup);
            col = 0;
            currentGroup = [];
          }
        }
        if (currentGroup.length) {
          newGroupList.push(currentGroup);
        }
      }

      this.ngZone.run(() => {
        this.groupList = newGroupList;
      });
    });
  }
}
