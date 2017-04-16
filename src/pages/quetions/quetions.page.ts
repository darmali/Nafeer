import { Component } from '@angular/core';

import { NavController,NavParams,LoadingController,AlertController } from 'ionic-angular';
import { ImagePicker,Camera,Geolocation } from 'ionic-native';
import { Home,MapPage } from '../page';
import { NafeerApi,ItemsDesc } from '../../shared/shared';
import _ from 'lodash';
import 'rxjs/add/operator/map';




@Component({
  selector: 'quetions-page',
  templateUrl: 'quetions.page.html'
})
export class Quetions {
  title:any;
  quetions = [];
  pages = [];
  items = [];
  itemsdesc =[];
  subcategory: any;
  map:any;
  item1:any;
  item2:any;
  item3:any;

  constructor(public alertCtrl: AlertController,public loadingController: LoadingController,public navCtrl: NavController , public navParams: NavParams,public nafeerApi: NafeerApi) {
    this.subcategory = this.navParams.data;
  }
  ionViewDidLoad() {
    
     let loader = this.loadingController.create({
      content: 'Loading data ...'
    });

    loader.present().then(() => {

      this.quetions =  this.nafeerApi.getTask(this.subcategory.id);

      // .filter((question) => {return (question.id === this.subcategory.questionid );});
      
      loader.dismiss();

    });
    
  }

  goHome(){ 
    this.navCtrl.setRoot(Home);
  }

   itemTapped(event) {
     this.getLocation();
    //  this.navCtrl.push(MapPage,)
  }

  getImg()
  {
    let options = {
    maximumImagesCount: 8,
    width: 500,
    height: 500,
    quality: 75
  }
    ImagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
    }
    }, (err) => { });
  }
  getCamera()
  {
    Camera.getPicture(this.getCameraOption()).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    //let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
  }
  getCameraOption()
  {
      let options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }
  goToMap()
  {
    _.forEach(this.quetions, td => {
       // console.log(td);
       if(td.tasktype_id == 2)
       {
         _.forEach(td.items,item => {
           //console.log(item);

           if(td.value == item.name)
           {
             var res = new ItemsDesc(item.id,td.id,true);
           }
           else
           {
             var res = new ItemsDesc(item.id,td.id,false);
           }
           this.itemsdesc.push(res);
         });
       }
      if(td.tasktype_id == 1) {
         _.forEach(td.items,item => {
           //console.log(item);
           var res = new ItemsDesc(item.id,td.id,item.ischecked);
           this.itemsdesc.push(res);
         });
       }


    });
    // console.log(this.itemsdesc);
    let category =_.uniqBy(this.itemsdesc, 'task_id');
    // console.log(category);


    let loader = this.loadingController.create({
      content: ''
    });

    loader.present().then(() => {

      Geolocation.getCurrentPosition().then((resp) => {
      this.map = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        zoom: 15,
        markerLabel: "My Location" ,
        description: "",
        tasker_id:"",
        items:this.itemsdesc
      };
      // console.log(this.map);
      this.navCtrl.push(MapPage,{ map:this.map, subcat:this.subcategory });
      loader.dismiss();
      
      }).catch((error) => {
        var errormessage='Error getting location', error;
        console.log(error);
        //console.log(errormessage);
        this.showAlert(errormessage);
        loader.dismiss();
        
      });

    });
  }
  
  getLocation()
  {

      Geolocation.getCurrentPosition().then((resp) => {
      this.map = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        zoom: 15,
        markerLabel: "My Location" 
      };

      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = Geolocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.map = {
        lat: data.coords.latitude,
        lng: data.coords.longitude,
        zoom: 15,
        markerLabel: "My Location" 
      };
      });

      
  }
   showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Please make sure that your device has network connectivity',
      buttons: ['OK']
    });
    alert.present();
  }

}
