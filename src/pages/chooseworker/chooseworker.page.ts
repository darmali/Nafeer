import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,Profile } from '../page';
import { NafeerApi } from '../../shared/shared';


@Component({
  selector: 'chooseworker-page',
  templateUrl: 'chooseworker.page.html'
})
export class ChooseWorker {

 taskers:any;
 sliderOptions: any;
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
     this.sliderOptions = {
      pager: true
    };
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      this.taskers =  this.nafeerApi.getTaskers();
      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      loader.dismiss();

    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  goToProfile(tasker)
  {
    this.navCtrl.push(Profile,tasker);
  }

}
