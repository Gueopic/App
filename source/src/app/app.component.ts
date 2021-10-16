import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/core/database/core/storage.service';
import { VerbsDatabaseService } from 'src/core/database/verbs-database.service';
import { VerbModel } from 'src/core/models/verb.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private verbsDatabase: VerbsDatabaseService,
  ) {}

  ngOnInit() {
    this.platform.ready().then((res) => {
      console.debug('Platform initialized:', res);
      this.bootstrap();
    });

  }

  private async bootstrap(): Promise<void> {
    await this.storageService.init();
  }
}
