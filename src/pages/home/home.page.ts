import { Component} from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import {Http} from '@angular/http';
import { SubCategories,Quetions } from '../page';

import { NafeerApi } from '../../shared/shared';




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

  
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams, public nafeerApi: NafeerApi,private http:Http) {
     
  }
  ionViewDidLoad() {
    
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.categories =this.nafeerApi.getCategories();
      var response = this.nafeerApi.getCategories();
      if(response){
        response.subscribe(res=>{
          this.categories = res.data;
        });
      }
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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
