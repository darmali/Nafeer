import { Component } from '@angular/core';
import { NavParams , LoadingController , NavController} from 'ionic-angular';
//import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { ChooseWorker,Home } from '../page';

import { NafeerApi } from '../../shared/shared';
declare var window: any;

@Component({
  selector: 'map-page',
  templateUrl: 'map.page.html'
  
  //directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class MapPage {

  map: any;

  constructor(public loadingController: LoadingController,public navCtrl: NavController ,public navParams: NavParams, public nafeerApi: NafeerApi) {
      this.map = this.navParams.data;

  }

  ionViewDidLoad(){
    // let games = this.navParams.data;
    // let tourneyData = this.nafeerApi.getCurrentTourney();
    // let location = tourneyData.locations[games.locationId];

    // this.map = {
    //   lat: 24.708086,
    //   lng: 46.678583,
    //   zoom: 12,
    //   markerLabel: "Tamkeen Technologies" 
    // };

  }

  getDirections() { 
   window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }
  getWorker()
  {
    this.navCtrl.push(ChooseWorker);
  }
  goHome(){
    this.navCtrl.setRoot(Home);
  }

}
