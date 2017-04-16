import { Component } from '@angular/core';
import { PreHome,Register } from '../page';
import { NavController, AlertController, LoadingController, Loading,Platform } from 'ionic-angular';
import { AuthService,NafeerApi,User } from '../../shared/shared';
import {SQLite} from "ionic-native";

@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html'
})
export class Login {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
  public database: SQLite;
  public users: Array<Object>;

  constructor(private platform: Platform,private nav: NavController, private auth: AuthService,private nafeerapi: NafeerApi, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  }
   public createAccount() {
    this.nav.push(Register);
  }
   public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {

          this.nafeerapi.getCurrentUser(allowed.token).subscribe(user => {
            if (user) {
              this.auth.currentUser = new User(user.id,user.first_name,user.last_name,user.phone,user.email,user.usertype_id);
              this.nafeerapi.currentUser = new User(user.id,user.first_name,user.last_name,user.phone,user.email,user.usertype_id);
              this.auth.currentUser.token = allowed.token;
              this.nafeerapi.currentUser.token = allowed.token;
              this.add(this.nafeerapi.currentUser);
              this.refresh();
              console.log(this.users);

          }else {
              this.showError("Access Denied");
            }
          },error => {
            this.showError(error);
          });
          // this.auth.currentUser.token = allowed.token;
          // this.nafeerapi.currentUser.token = allowed.token;
        this.loading.dismiss();
        //console.log(this.auth.currentUser);
        this.nav.setRoot(PreHome)
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  goHome(){
    this.nav.setRoot(PreHome);
  }

  public refresh() {
    this.database.executeSql("SELECT * FROM user", []).then((data) => {
      this.users = [];
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          var obj = new User(data.rows.item(i).id,data.rows.item(i).first_name,data.rows.item(i).last_name,data.rows.item(i).phone,data.rows.item(i).email,data.rows.item(i).usertype);
          this.users.push(obj);
        }
      }
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
    });
  }

  public add(obj:User) {
    this.database.executeSql("INSERT INTO people (first_name, last_name , phone, email ,usertype,token ) VALUES (obj.first_name,obj.last_name,obj.phone,obj.email,obj.usertype_id,obj.token )", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error.err));
    });
  }

}
