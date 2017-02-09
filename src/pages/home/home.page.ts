import { Component} from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { SubCategories,Quetions } from '../page';

import { NafeerApi } from '../../shared/shared';
import _ from 'lodash';



@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html'
})
export class Home {

  
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  tab = 0;
  categories:any = [];
  subcategories:any = [];

  
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams, public nafeerApi: NafeerApi) {
     
  }
  ionViewDidLoad() {
    
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      this.categories =this.nafeerApi.getCategories();
      loader.dismiss();

    });
  }
  goHome(){ 
    this.navCtrl.setRoot(Home);
  }

  search() {
    this.tab = 1;
    let queryTextLower = this.queryText.toLowerCase();

    let filteredsubcategories = [];
    
    _.forEach(this.nafeerApi.getSubCategories(), td => {
      
      let category = _.filter(td,t => td.title.toLowerCase().includes(queryTextLower) );
      
      if (category.length) {
        filteredsubcategories.push(td);
      }
    });

    this.subcategories = filteredsubcategories;
  }
  goSubCategory(category){ 
    this.navCtrl.push(SubCategories,category);
  }
  itemTapped(event, item) {
       this.navCtrl.push(Quetions,item);

  }

}
