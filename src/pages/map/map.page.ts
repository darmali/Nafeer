import { Component } from '@angular/core';
import { NavParams , LoadingController , NavController,ModalController} from 'ionic-angular';
//import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { ChooseWorker,Home
  // ,AutocompletePage
 } from '../page';

import { NafeerApi } from '../../shared/shared';
declare var window: any;

@Component({
  selector: 'map-page',
  templateUrl: 'map.page.html'
  
  //directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class MapPage {

  map: any;
  address:any;

  constructor(public loadingController: LoadingController,public navCtrl: NavController ,public navParams: NavParams, public nafeerApi: NafeerApi, private modalCtrl: ModalController) {
      this.map = this.navParams.get('map');
      //this.map = this.navParams.get('subcat');
       this.address = {
            place: ''
        };

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
  // showAddressModal () {
  //   let modal = this.modalCtrl.create(AutocompletePage);
  //   let me = this;
  //   modal.onDidDismiss(data => {
  //     this.address.place = data;
  //   });
  //   modal.present();
  // }

  getDirections() { 
   window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }
  getWorker()
  {
    this.navCtrl.push(ChooseWorker,this.navParams.get('subcat'));
  }
  goHome(){
    this.navCtrl.setRoot(Home);
  }

}
