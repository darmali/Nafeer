import { Component, ViewChild } from '@angular/core';
import { Nav,NavController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { NewJob,JobRequests,Inbox,RateUs,Settings,Home,Login } from '../page';
import { AuthService } from '../../shared/shared';


@Component({
  selector: 'prehome-page',
  templateUrl: 'prehome.page.html'
  // template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class PreHome {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string,icon: string, component: any}>;

  constructor(public navctl: NavController,translate: TranslateService,public auth: AuthService) {
    // let info = auth.getUserInfo();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Job',icon: 'ios-add-circle', component: NewJob },
      { title: 'Job Requests',icon: 'ios-list-box', component: JobRequests },
      { title: 'Chat',icon: 'ios-chatboxes', component: Inbox },
      { title: 'Rate Us',icon: 'ios-star', component: RateUs },
      { title: 'Settings',icon: 'ios-settings', component: Settings },
    ];
   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navctl.setRoot(Login)
    });
  }
}
