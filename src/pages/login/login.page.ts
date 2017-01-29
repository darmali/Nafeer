import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Home } from '../page';


@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html'
})
export class Login {

  constructor(public navCtrl: NavController) {
    
  }
  goHome(){
    this.navCtrl.setRoot(Home);
  }

}
