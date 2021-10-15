import { Component, OnInit } from '@angular/core';
import { PhraseData } from 'src/interfaces/global.interfaces';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'gueo-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {}

  deletePhraseObject(id: number) {
    this.dataService.deletePhraseObject(id);
  }

  deleteObject(id: number){
    this.dataService.deleteObject(id);
  }
}
