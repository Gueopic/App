import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoaderModule } from 'src/core/modules/translate/translate.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { Capacitor } from '@capacitor/core';
import { CameraService } from 'src/core/services/camera.service';
import { CameraServiceMock } from 'src/core/services/mocks/camera.service.mock';
import { AudioService } from 'src/core/services/audio.service';
import { AudioServiceMock } from 'src/core/services/mocks/audio.service.mock';

console.log('IS NATIVE:', Capacitor.isNativePlatform());

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
    }
  );
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
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
