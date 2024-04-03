import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateLoaderModule } from 'src/core/modules/translate/translate.module';
import { AudioService } from 'src/core/services/audio.service';
import { CameraService } from 'src/core/services/camera.service';
import { AudioServiceMock } from 'src/core/services/mocks/audio.service.mock';
import { CameraServiceMock } from 'src/core/services/mocks/camera.service.mock';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// If is native, will use main services, otherwise mock services will be used
const providers: Provider[] = [];
if (Capacitor.isNativePlatform()) {
  providers.push(CameraService, AudioService);
} else {
  providers.push(
    {
      provide: CameraService,
      useClass: CameraServiceMock,
    },
    {
      provide: AudioService,
      useClass: AudioServiceMock,
    },
  );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateLoaderModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ...providers,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
