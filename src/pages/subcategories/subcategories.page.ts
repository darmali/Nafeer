import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,Quetions } from '../page';
import { NafeerApi } from '../../shared/shared';
import _ from 'lodash';




@Component({
  selector: 'subcategories-page',
  templateUrl: 'subcategories.page.html'
})
export class SubCategories {
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  tab = 0;
  subcategories = [];
  category: any;
  
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
       
    this.category = this.navParams.data;
  }
  ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      this.search();
      loader.dismiss();

    });
    
  }

  goHome(){ 
    this.navCtrl.setRoot(Home);
  }

   search() {
    let queryTextLower = this.queryText.toLowerCase();

    let filteredsubcategories = [];
    // let rs = _.filter(this.nafeerApi.getSubCategories(), function(subcategory) {
    // return subcategory.categoryid === this.category.categoryid && subcategory.title.toLowerCase().includes(queryTextLower);
    //   });
    // console.log(rs);
    _.forEach(this.nafeerApi.getSubCategories(), td => {
      
      let category = _.filter(td,t => td.title.toLowerCase().includes(queryTextLower) && td.categoryid === this.category.id);
      if (category.length) {
        filteredsubcategories.push(td);
      }
    });

    this.subcategories = filteredsubcategories;
  }
  
   itemTapped(event, item) {
    this.navCtrl.push(Quetions,item)
  }

}
