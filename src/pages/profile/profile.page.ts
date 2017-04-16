import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Home } from '../page';
import { NafeerApi } from '../../shared/shared';
import _ from 'lodash';


@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
})
export class Profile {

  tasker:any;
  profilestatus='profile';
  reviewers:any =[];

  constructor(private alertCtrl:AlertController, public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    this.tasker = this.navParams.data;
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      // this.reviewers =  this.nafeerApi.getReviewers();
        var response = this.nafeerApi.getReviews(this.tasker.id);
        if(response){
            response.subscribe(res=>{
                _.forEach(res, td => {

                    this.reviewers.push(td);

                });

            });
        }
      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      loader.dismiss();

    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  addReview() {
  let alert = this.alertCtrl.create({
    title: 'Add Review',
    inputs: [
      {
        name: 'review',
        type: 'range',
        value: '0',
        id: 'input-range'       

      },
      {
        name: 'comment',
        placeholder: 'Review',
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {

          console.log('any way I would like to add comment');
          console.log(data.review);
          // if (User.isValid(data.username, data.password)) {
          //   // logged in!
          // } else {
          //   // invalid login
          //   return false;
          // }
          
        }
      }
    ],
    cssClass:'profile-page'
  });
  alert.present();
}

}
