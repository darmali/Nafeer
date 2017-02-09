import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NewJob,JobRequests,Inbox,RateUs,Settings,Home,SubCategories,Quetions,ContactusPage,
  Login,MymapPagePage,Profile,MapPage,ChatPage,
  ChooseWorker,PreHome,Register,AutocompletePage } from '../pages/page';
import { NafeerApi,AuthService } from '../shared/shared';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { TranslateModule , TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
 
export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

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
    MymapPagePage,
    PreHome,
    Register,
    AutocompletePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyA0j10pfE_prluaURw17JQmgeXeBW_xHS0'}),
    TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
  })

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
    MymapPagePage,
    PreHome,
    Register,
    AutocompletePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},NafeerApi,AuthService]
})
export class AppModule {
  
}

