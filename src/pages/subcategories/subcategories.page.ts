import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,Quetions } from '../page';
import { NafeerApi } from '../../shared/shared';




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
    this.subcategories = this.category.subcategories;
  }
  ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      //this.search();
      loader.dismiss();

    });
    
  }

  goHome(){ 
    this.navCtrl.setRoot(Home);
  }

   search() {
    let queryTextLower = this.queryText.toLowerCase();

    let filteredsubcategories = [];
    if(queryTextLower == "" || queryTextLower == null)
    {
        filteredsubcategories = this.category.subcategories;
    }
    else
    {
        this.category.subcategories.forEach(item => {
            if(item.title.toLowerCase().includes(queryTextLower))
                filteredsubcategories.push(item);
        });
    }

    this.subcategories = filteredsubcategories;
  }
  
   itemTapped(event, item) {
    this.navCtrl.push(Quetions,item);
  }

}
