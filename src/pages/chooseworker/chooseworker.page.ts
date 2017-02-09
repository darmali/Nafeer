import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,Profile,ChatPage } from '../page';
import { NafeerApi } from '../../shared/shared';


@Component({
  selector: 'chooseworker-page',
  templateUrl: 'chooseworker.page.html'
})
export class ChooseWorker {

 taskers:any;
 sliderOptions: any;
 subcat:any;
 inbox=[];
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    this.subcat = this.navParams.data;
     this.sliderOptions = {
      pager: true
    };
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      this.taskers =  this.nafeerApi.getTaskers();
      this.inbox =  this.nafeerApi.getInbox();
      loader.dismiss();

    });
    
  }

  goHome(){
     let loader = this.loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loader.present().then(() => {
      this.navCtrl.setRoot(Home);
      loader.dismiss();

    });
  }

  goToProfile(tasker)
  {
    this.navCtrl.push(Profile,tasker);
  }
  goToChat(tasker)
  {
    let chat;
    chat = this.inbox.filter(a => a.id == tasker.id)[0];
    this.navCtrl.push(ChatPage,chat);
  }

}
