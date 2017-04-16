import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions,Response}  from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs';
import { Observable } from 'rxjs/Rx';


import _ from 'lodash';

@Injectable()
export class NafeerApi {
    private baseUrl = 'http://127.0.0.1:8000/api/v1';
    data:any;
    currentUser: User;
    items = [
    
     
    ];

    taskers = [
      { id:1,name: 'joe kiven',title:'Cleaner',img: 'assets/img/46ce2bc282f5a62c5b6be5fd4430df9c.jpg' },
      { id:2,name: 'Suraj Ha',title:'Teacher',img: 'assets/img/Arnold_Faces_profile2.jpg' },
      { id:3,name: 'Aaron',title:'Family Support Specialist',img: 'assets/img/Blog_Main_Justin-1140x500.jpg' },
      { id:4,name: 'Alexis',title:'Digital Operator',img: 'assets/img/images.jpeg' },
      { id:5,name: 'Ali Khan',title:'Plumber',img: 'assets/img/profile-img.jpeg' },
      { id:6,name: 'Liza',title:'Electric Worker',img: 'assets/img/profile_img_2.jpg' },
      
     
    ];

     reviewers = [
      { id:1,name: 'joe kiven',mesg:'I am so glad to know this guy',img: 'assets/img/46ce2bc282f5a62c5b6be5fd4430df9c.jpg' },
      { id:2,name: 'Suraj Ha',mesg:'He is good in his job',img: 'assets/img/Arnold_Faces_profile2.jpg' },
    ];
    requests = [
      { id:1,name: 'joe kiven',img: 'assets/img/46ce2bc282f5a62c5b6be5fd4430df9c.jpg',date:'4 jan',reqid:'TMK-111 21' },
      { id:2,name: 'Suraj Ha',img: 'assets/img/Arnold_Faces_profile2.jpg' ,date:'4 jan',reqid:'TMK-111 983'},
      { id:3,name: 'Aaron',img: 'assets/img/Blog_Main_Justin-1140x500.jpg',date:'4 jan',reqid:'TMK-111 45' },
      { id:4,name: 'Alexis',img: 'assets/img/images.jpeg' ,date:'4 jan',reqid:'TMK-111 56'},
      { id:5,name: 'Ali Khan',img: 'assets/img/profile-img.jpeg' ,date:'4 jan',reqid:'TMK-111 45'},
      { id:6,name: 'Liza',img: 'assets/img/profile_img_2.jpg' ,date:'4 jan',reqid:'TMK-111 689'},
      
     
    ];

    inbox = [
      { id:1,name: 'joe kiven',lastmessage:'Hello',img: 'assets/img/46ce2bc282f5a62c5b6be5fd4430df9c.jpg',time:'11:23 AM' },
      { id:2,name: 'Suraj Ha',lastmessage:'Hi',img: 'assets/img/Arnold_Faces_profile2.jpg' ,time:'01:07 PM'},
      { id:3,name: 'Aaron',lastmessage:'salm',img: 'assets/img/Blog_Main_Justin-1140x500.jpg' ,time:'09:11 AM'},
      { id:4,name: 'Alexis',lastmessage:'Dude',img: 'assets/img/images.jpeg' ,time:'03:27 AM'},
      { id:5,name: 'Ali Khan',lastmessage:'are you there ?',img: 'assets/img/profile-img.jpeg' ,time:'12:23 AM'},
      { id:6,name: 'Liza',lastmessage:'Did you fix it ?',img: 'assets/img/profile_img_2.jpg',time:'11:23 AM' },
      
     
    ];


    
    constructor(public http: Http) { }

    load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(`${this.baseUrl}/Categories`)
        .map(this.processData);
    }
  }

   processData(data) {
    this.data = data.json();
    return this.data;
  }


    
  getMap() {
    return this.load().map(data => {
      return data.map;
    });
  }
    getReviewers()
    {
      return this.reviewers;
    }
    getItems(){
        return this.items;
    }
    getInbox()
    {
      return this.inbox;
    }
    getRequests(){
        return this.http.get( this.baseUrl + "/Request?token="+this.currentUser.token).map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }


    getSubCategories(){
        let list = [];
        this.http.get( this.baseUrl + "/SubCategories").subscribe(data => {

            _.forEach(data.json().data, td => {
                list.push(td);
            });
        });

        return list;
    }
    searchLocation(location){
        let list = [];
        this.http.get("https://maps.google.com/maps/api/geocode/json?address="+location).subscribe(data => {

            _.forEach(data.json().results, td => {
                list.push(td);
            });
        });

        return list;
    }
    searchsubcategories(subcat)
    {
        let list = [];
        this.http.get( this.baseUrl + "/SubCategories").subscribe(data => {

            _.forEach(data.json().data, td => {
                let category = _.filter(td,t => td.title.toLowerCase().includes(subcat) );
                if (category.length) {
                    list.push(td);
                }
            });
        });

        return list;
    }
    getCategories() {
        return this.http.get( this.baseUrl + "/Categories").map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getTaskers() {
        return this.http.get( this.baseUrl + "/Taskers").map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAvalibaleTaskers(subcat_id) {
        return this.http.get( this.baseUrl + "/TaskerSubCategories/"+subcat_id).map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTask(subcat) {
        let list = [];
        this.http.get( this.baseUrl + "/Tasks?token="+this.currentUser.token).subscribe(data => {
            _.forEach(data.json().data, td => {
                if(td.subcategory_id == subcat)
                {
                    list.push(td);
                }
            });
        });
        return list;
    }

    getReviews(tasker) {
        return this.http.get( this.baseUrl + "/GetReview/"+tasker+"?token="+this.currentUser.token).map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    createRequest(request)
    {
        let body = JSON.stringify(request);
        console.log(body);
        let headers = new Headers(
            {'Content-Type': 'application/json'}
        );
        let options = new RequestOptions({
            headers: headers
        });
        return this.http
            .post(this.baseUrl+'/Request/Create?token='+this.currentUser.token, body,options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCurrentUser(token) {
        return this.http.get( this.baseUrl + "/CurrentCustomer?token="+token).map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}

export class User {

    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    token: string;
    usertype_id:number;
    image:string;
    id: number;



  constructor(id:number,first_name: string,last_name: string,phone: string, email: string,usertype_id:number) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.phone = phone;
      this.email = email;
      this.usertype_id = usertype_id;
  }
}

export class ItemsDesc {

    id: number;
    task_id: number;
    value: boolean;


    constructor(id:number,task_id:number,value: boolean) {
        this.id = id;
        this.value = value;
        this.task_id = task_id;
    }
}


@Injectable()
export class AuthService {
  currentUser: User;
  private baseUrl = 'http://127.0.0.1:8000/api/v1';
    constructor(public http: Http) { }

    base
 
  public login(credentials) {


    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
        console.log("I am trying to login ");

        let body = new FormData();
        body.append('email', credentials.email);
        body.append('password', credentials.password);
        return this.http
            .post(this.baseUrl+'/User/Login', body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        // return Observable.create(observer => {
        //     // At this point make a request to your backend to make a real check!
        //
        //     let access = (credentials.password === "123" && credentials.email === "waleed");
        //     this.currentUser = new User('Simon', 'saimon@devdactic.com','');
        //     observer.next(access);
        //     observer.complete();
        // });


    }
  }
 
  public register(credentials) {

      if (credentials.email === null || credentials.password === null || credentials.first_name === null
          || credentials.last_name === null || credentials.phone === null
      ) {
      return Observable.throw("Please insert credentials");
    } else {

          let body = new FormData();
          body.append('email', credentials.email);
          body.append('password', credentials.password);
          body.append('first_name', credentials.first_name);
          body.append('last_name', credentials.last_name);
          body.append('phone', credentials.phone);
          // body.append('image', 'http://lorempixel.com/250/250/?16727');
          let headers = new Headers({
              'Content-Type': 'application/json'
          });
          let options = new RequestOptions({
              headers: headers
          });
          return this.http
              .post(this.baseUrl+'/User/Register/Customer', body)
              .map((res:Response) => res.json());

      // At this point store the credentials to your backend!
      // return Observable.create(observer => {
      //   observer.next(true);
      //   observer.complete();
      // });
    }
  }
    getTests(){

        let body = new FormData();
        body.append('email', 'waleed123@123.com');
        body.append('password', 'secret');
        return this.http
            .post(this.baseUrl+'/User/Login', body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}