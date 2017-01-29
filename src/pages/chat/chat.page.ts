import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home } from '../page';
import { NafeerApi } from '../../shared/shared';

@Component({
  selector: 'chat-page',
  templateUrl: 'chat.page.html'
})
export class ChatPage {

  messagesList:any=[];
  item:any;
  message:string='';

  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    this.item = this.navParams.data;
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data ...'
    });

    loader.present().then(() => {
      // this.category = this.navParams.data;
      // this.taskers =  this.nafeerApi.getTaskers();
      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      loader.dismiss();

    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  setMessage()
  {
    this.messagesList.push(this.message);
    this.message = '';
  }

}
