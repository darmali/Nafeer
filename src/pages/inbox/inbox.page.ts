import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,ChatPage } from '../page';
import { NafeerApi } from '../../shared/shared';

@Component({
  selector: 'inbox-page',
  templateUrl: 'inbox.page.html'
})
export class Inbox {

  inbox:any;
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      this.inbox =  this.nafeerApi.getInbox();
      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      loader.dismiss();

    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  goToChat(item)
  {
    this.navCtrl.push(ChatPage,item);
  }

}
