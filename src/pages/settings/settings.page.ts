import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Home } from '../page';


@Component({
  selector: 'settings-page',
  templateUrl: 'settings.page.html'
})
export class Settings {

  constructor(public navCtrl: NavController) {
    
  }
  goHome(){
    this.navCtrl.setRoot(Home);
  }

}
