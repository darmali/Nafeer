import { Component } from '@angular/core';
// import { PreHome } from '../page';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../shared/shared';

 
 

@Component({
  selector: 'register-page',
  templateUrl: 'register.page.html'
})
export class Register {
    createSuccess = false;
  registerCredentials = {email: '', password: '', phone: '' };
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}
 
  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
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
