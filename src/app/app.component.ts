import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { NewJob,JobRequests,Inbox,RateUs,Settings,Login } from '../pages/page';

@Component({
  selector: 'menu-page',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string,icon: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Job',icon: 'ios-add-circle', component: NewJob },
      { title: 'Job Requests',icon: 'ios-list-box', component: JobRequests },
      { title: 'Inbox',icon: 'ios-chatboxes', component: Inbox },
      { title: 'Rate Us',icon: 'ios-star', component: RateUs },
      { title: 'Settings',icon: 'ios-settings', component: Settings },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
