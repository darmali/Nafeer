import { Component, ViewChild, ElementRef } from '@angular/core';

import { NafeerApi } from '../../shared/shared';

import { Platform,LoadingController,ViewController } from 'ionic-angular';


declare var google: any;

@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.page.html'
})
export class ContactusPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public nafeerApi: NafeerApi, 
  public platform: Platform,
  public loadingCtrl: LoadingController,
  public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

      this.nafeerApi.getMap().subscribe(mapData => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find(d => d.center),
          zoom: 16
        });

        mapData.forEach(markerData => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });

  }

   openSocial(network, fab) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }
  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}