import { Component, ViewChild } from '@angular/core';
import { Nav,NavController,NavParams,Platform } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { NewJob,JobRequests,Inbox,RateUs,Settings,Home,Login } from '../page';
import { AuthService,User,NafeerApi } from '../../shared/shared';
import {SQLite} from "ionic-native";


@Component({
  selector: 'prehome-page',
  templateUrl: 'prehome.page.html'
  // template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class PreHome {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  currentuser:User;
  public database: SQLite;
  public user: Array<Object>;
  pages: Array<{title: string,icon: string, component: any}>;

  constructor(private platform:Platform,public navctl: NavController,translate: TranslateService,public navParams: NavParams, public auth: AuthService,private nafeerapi:NafeerApi) {
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });

    this.currentuser = this.nafeerapi.currentUser;
    console.log( "what the heck ? "+this.user );
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Job',icon: 'ios-add-circle', component: NewJob },
      { title: 'Job Requests',icon: 'ios-list-box', component: JobRequests },
      { title: 'Chat',icon: 'ios-chatboxes', component: Inbox },
      { title: 'Rate Us',icon: 'ios-star', component: RateUs },
      { title: 'Settings',icon: 'ios-settings', component: Settings },
    ];

  }
  ionViewDidLoad() {
    console.log(this.auth.currentUser);
    this.currentuser = this.auth.currentUser;
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

  public refresh() {
    this.database.executeSql("SELECT * FROM user", []).then((data) => {
      this.user = [];
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          var obj = new User(data.rows.item(i).id,data.rows.item(i).first_name,data.rows.item(i).last_name,data.rows.item(i).phone,data.rows.item(i).email,data.rows.item(i).usertype);
          this.user.push(obj);
        }
      }
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
    });
  }
}
