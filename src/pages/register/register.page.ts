import { Component } from '@angular/core';
// import { PreHome } from '../page';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService,NafeerApi,User } from '../../shared/shared';


 
 

@Component({
  selector: 'register-page',
  templateUrl: 'register.page.html'
})
export class Register {
    createSuccess = false;
  registerCredentials = {email: '', password: '', phone: '',first_name:'',last_name:'' };
 
  constructor(private nav: NavController, private auth: AuthService,private nafeerapi:NafeerApi, private alertCtrl: AlertController) {}
 
  public register() {

      this.auth.register(this.registerCredentials).subscribe(success => {
              if (success) {
                  var user = success.user;
                  console.log(user);
                  this.auth.currentUser = new User(user.id,user.first_name,user.last_name,user.phone,user.email,user.usertype_id);
                  this.nafeerapi.currentUser = new User(user.id,user.first_name,user.last_name,user.phone,user.email,user.usertype_id);
                  this.createSuccess = true;
                  this.showPopup("Success", "Account created.");
              } else {
                  this.showPopup("Error", "Problem creating account.");
              }
          },
          error => {
              this.showPopup("Error", error);
          });

  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    
    alert.present();
  }
}
