import { Component } from '@angular/core';


import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,Profile } from '../page';
import { NafeerApi } from '../../shared/shared';


@Component({
  selector: 'jobrequests-page',
  templateUrl: 'jobrequests.page.html'
})
export class JobRequests {
  requests:any;
  jobrequest:any;
  jobrequests='pending';
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      this.requests =  this.nafeerApi.getRequests();
      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      loader.dismiss();

    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  goToProfile()
  {
    this.navCtrl.push(Profile);
  }
}
