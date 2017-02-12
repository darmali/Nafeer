import { Component,NgZone } from '@angular/core';
import {  AlertController, ViewController } from 'ionic-angular';
import { AuthService } from '../../shared/shared';
 

@Component({
  selector: 'Autocomplete-page',
  templateUrl: 'Autocomplete.page.html'
})
export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  // service = new google.maps.places.AutocompleteService();

  constructor(private viewCtrl: ViewController,private zone: NgZone, private auth: AuthService, private alertCtrl: AlertController) {
     this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    // let me = this;
    // this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'TH'} }, function (predictions, status) {
    //   me.autocompleteItems = []; 
    //   me.zone.run(function () {
    //     predictions.forEach(function (prediction) {
    //       me.autocompleteItems.push(prediction.description);
    //     });
    //   });
    // });
  }
 

}
