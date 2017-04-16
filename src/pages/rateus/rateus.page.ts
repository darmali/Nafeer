import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,Profile } from '../page';
import { NafeerApi } from '../../shared/shared';
import _ from 'lodash';


@Component({
  selector: 'rateus-page',
  templateUrl: 'rateus.page.html',
})
export class RateUs {
  taskers:any = [];
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    
  }
 ionViewDidLoad() {
    this.getData();
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  goToProfile(tasker)
  {
    this.navCtrl.push(Profile,tasker);
  }

    doRefresh(refresher) {

        setTimeout(() => {
            this.getData();
            refresher.complete();
        }, 2000);
    }

    getData()
    {

        let loader = this.loadingController.create({
            content: 'Loading data...'
        });

        loader.present().then(() => {
            // this.category = this.navParams.data;
            // this.taskers =  this.nafeerApi.getTaskers();
            var response = this.nafeerApi.getTaskers();
            if(response){
                response.subscribe(res=>{
                    _.forEach(res, td => {

                        this.taskers.push(td);

                    });

                });
            }
            // .filter((question) => {return (question.id === this.subcategory.questionid );});
            loader.dismiss();

        });
    }

}
