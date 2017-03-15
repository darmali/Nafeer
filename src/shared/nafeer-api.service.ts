import { Injectable } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

import _ from 'lodash';

@Injectable()
export class NafeerApi {
    private baseUrl = 'http://127.0.0.1:8000';
    data:any;


    questions = [
      { id:1,name: 'Plumbing Installation and Repair'},
    ];
    pages = [
      { id:1,name: 'What kind of work do you need?',type: 1,value:'',
      items:[
            { id:1,name: 'Install', isChecked:false, pageid: 1},
            { id:2,name: 'Repair', isChecked:false, pageid: 1},
            { id:3,name: 'Removal', isChecked:false, pageid: 1},
            { id:4,name: 'Other (Please specify in your description)', isChecked:false, pageid: 1},
            { id:5,name: 'No problem, I just need an installation', isChecked:false, pageid: 1},
            ], questionid: 1,},
      { id:2,name: 'What problem(s) are you having?',type: 1,value:'',
      items:[
            { id:6,name: 'Burst', isChecked:false, pageid: 1},
            { id:7,name: 'Leak', isChecked:false, pageid: 1},
            { id:8,name: 'Clogged pipe/drain', isChecked:false, pageid: 1},
            { id:9,name: 'Noisy pipe(s)', isChecked:false, pageid: 1},
            { id:10,name: 'Unpleasant odour from drain(s)', isChecked:false, pageid: 1},
            { id:11,name: 'Low pressure', isChecked:false, pageid: 1},
            { id:12,name: 'Fixture not draining or flushing', isChecked:false, pageid: 1},
            { id:13,name: 'Other (Please specify in your description)', isChecked:false, pageid: 1},
      ], questionid: 1},
      { id:3,name: 'Which part of the plumbing system requires work?',type: 1,value:'',
      items:[
            { id:14,name: 'Pipes and drains', isChecked:false, pageid: 1},
            { id:15,name: 'Sink/Basin', isChecked:false, pageid: 1},
            { id:16,name: 'Shower', isChecked:false, pageid: 1},
            { id:17,name: 'Bathtub', isChecked:false, pageid: 1},
            { id:18,name: 'Toilet', isChecked:false, pageid: 1},
            { id:19,name: 'Water Filter', isChecked:false, pageid: 1},
            { id:20,name: 'Other (Please specify in your description)', isChecked:false, pageid: 1},
      ], questionid: 1},
      { id:4,name: 'Which room requires plumbing work?',type: 1,value:'',
      items:[
            { id:21,name: 'Bathroom', isChecked:false, pageid: 1},
            { id:22,name: 'Kitchen', isChecked:false, pageid: 1},
            { id:23,name: 'Entire building', isChecked:false, pageid: 1},
            { id:24,name: 'Other (Please specify in your description)', isChecked:false, pageid: 1},
      ], questionid: 1},
      { id:5,name: 'What type of property do you have?',type: 1,value:'',
      items:[
            { id:25,name: 'Single/Double-Storey House', isChecked:false, pageid: 1},
            { id:26,name: 'Apartment/Condo', isChecked:false, pageid: 1},
            { id:27,name: 'Commercial', isChecked:false, pageid: 1},
      ], questionid: 1},
      { id:6,name: 'Will you be providing the parts required?',type: 2,value:'',
      items:[
            { id:28,name: 'Yes, I will be providing the parts', isChecked:false, pageid: 1},
            { id:29,name: 'No. I need the plumber to provide it.', isChecked:false, pageid: 1},
      ], questionid: 1},
      { id:7,name: 'When do you need it done?',type: 2,value:'',
      items:[
            { id:30,name: 'This week', isChecked:false, pageid: 1},
            { id:31,name: 'Next week', isChecked:false, pageid: 1},
            { id:32,name: 'Within 30 days', isChecked:false, pageid: 1},
      ], questionid: 1},
      { id:8,name: 'Any other details?',type: 3,value:'',
      items:[

      ], questionid: 1},
    ];

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
        return this.requests;
    }
    getTaskers(){
        return this.taskers;
    }
    getPages(){
        return this.pages;
    }
    getQuestions(){
        return this.questions;
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
        let list = [];
        this.http.get( this.baseUrl + "/Categories").subscribe(data => {
            _.forEach(data.json().data, td => {
                list.push(td);
            });
        });
        return list;
    }
    getTask(subcat) {
        let list = [];
        this.http.get( this.baseUrl + "/Tasks").subscribe(data => {
            _.forEach(data.json().data, td => {
                if(td.subcategory_id == subcat)
                {
                    list.push(td);
                }
            });
        });
        return list;
    }
}

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}


@Injectable()
export class AuthService {
  currentUser: User;
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "123" && credentials.email === "waleed");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
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

