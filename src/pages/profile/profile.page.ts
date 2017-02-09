import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home } from '../page';
import { NafeerApi } from '../../shared/shared';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
})
export class Profile {

  tasker:any;
  profilestatus='profile';
  reviewers:any;

  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    this.tasker = this.navParams.data;
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      this.reviewers =  this.nafeerApi.getReviewers();
      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      loader.dismiss();

    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

}
