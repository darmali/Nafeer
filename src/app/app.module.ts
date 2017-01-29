import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NewJob,JobRequests,Inbox,RateUs,Settings,Home,SubCategories,Quetions,ContactusPage,Login,MymapPagePage,Profile,MapPage,ChatPage,ChooseWorker } from '../pages/page';
import { NafeerApi } from '../shared/shared';
import { AgmCoreModule } from 'angular2-google-maps/core';
 



@NgModule({
  declarations: [
    Login,
    MyApp,
    NewJob,
    JobRequests,
    Inbox,
    RateUs,
    Settings,
    Home,
    SubCategories,
    ContactusPage,
    Quetions,
    Profile,
    MapPage,
    ChatPage,
    ChooseWorker,
    MymapPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyA0j10pfE_prluaURw17JQmgeXeBW_xHS0'})

    
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Login,
    MyApp,
    NewJob,
    JobRequests,
    Inbox,
    RateUs,
    Settings,
    Home,
    SubCategories,
    ContactusPage,
    Quetions,
    Profile,
    MapPage,
    ChatPage,
    ChooseWorker,    
    MymapPagePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},NafeerApi]
})
export class AppModule {}
