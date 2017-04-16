import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Home,Profile,ChatPage } from '../page';
import { NafeerApi } from '../../shared/shared';
import _ from 'lodash';



@Component({
  selector: 'chooseworker-page',
  templateUrl: 'chooseworker.page.html'
})
export class ChooseWorker {

 taskers:any =[];
 sliderOptions: any;
 subcat:any;
 inbox=[];
 createSuccess = false;
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi,private alertCtrl: AlertController) {
    this.subcat = this.navParams.get('subcat');
     this.sliderOptions = {
      pager: true
    };
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.taskers =  this.nafeerApi.getTaskers();
      var response = this.nafeerApi.getAvalibaleTaskers(this.subcat.id);
        if(response){
            response.subscribe(res=>{
                _.forEach(res, td => {
                    this.taskers.push(td);
                });

            });
        }
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

  hirehim(tasker)
  {
      let loader = this.loadingController.create({
          content: 'Loading data...'
      });

      loader.present().then(() => {
          // this.taskers =  this.nafeerApi.getTaskers();
          var request = this.navParams.get('map');
          request.tasker_id = tasker.id;
          var response = this.nafeerApi.createRequest(request);
          if(response){
              response.subscribe(res=>{
                  if (res) {
                      this.createSuccess = true;
                      this.showPopup("Success", "Request created.");
                      this.goHome();
                  }else {
                      this.showPopup("Error", "Access Denied");

                  }
              },error => {
                  this.showPopup("Error", error);
              });
          }
          this.inbox =  this.nafeerApi.getInbox();
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

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                           // this.nav.popToRoot();
                        }
                    }
                }
            ]
        });

        alert.present();
    }

}
