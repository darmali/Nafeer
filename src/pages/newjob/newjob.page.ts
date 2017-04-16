import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { NafeerApi } from '../../shared/shared';
import { Home,SubCategories,Quetions } from '../page';


@Component({
  selector: 'newjob-page',
  templateUrl: 'newjob.page.html'
})
export class NewJob {

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

      let loader = this.loadingController.create({
          content: 'Loading data...'
      });

      loader.present().then(() => {
          this.subcategories = this.nafeerApi.searchsubcategories(queryTextLower);
          loader.dismiss();

      });
  }
  goSubCategory(category){ 
    this.navCtrl.push(SubCategories,category);
  }
  itemTapped(event, item) {
       this.navCtrl.push(Quetions,item);

  }

}
