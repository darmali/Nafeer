import { Component } from '@angular/core';


import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { Home,RequestDetails } from '../page';
import { NafeerApi } from '../../shared/shared';
import _ from 'lodash';



@Component({
  selector: 'jobrequests-page',
  templateUrl: 'jobrequests.page.html'
})
export class JobRequests {
    pending_requests:any=[];
    booked_requests:any=[];
    finshed_requests:any=[];
  jobrequest:any;
  jobrequests='pending';
  constructor(public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    
  }
 ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data...'
    });

    loader.present().then(() => {
      // this.requests =  this.nafeerApi.getRequests();

        var response = this.nafeerApi.getRequests();
        if(response){
            response.subscribe(res=>{
                _.forEach(res, td => {
                    if(td.requeststatus_id == 1)
                    {
                        this.pending_requests.push(td);
                    }

                    if(td.requeststatus_id == 2)
                    {
                        this.booked_requests.push(td);
                    }
                    if(td.requeststatus_id == 3)
                    {
                        this.finshed_requests.push(td);
                    }


                });

            });
        }

      loader.dismiss();
    });
    
  }

  goHome(){
    this.navCtrl.setRoot(Home);
  }

  goToRequest(request)
  {
    this.navCtrl.push(RequestDetails);
  }
}
