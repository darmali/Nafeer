import { Injectable } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NafeerApi {
    private baseUrl = 'https://elite-schedule-app-i2-64179.firebaseio.com';
    currentTourney: any = {};
    private tourneyData = {};
    data:any;
    subcategories = [
      { id:1,title: 'Plumbing Installation and Repair',categoryid:1 , questionid: 1},
      { id:2,title: 'Item 2',categoryid:1 , questionid: 1},
      { id:3,title: 'Item 3',categoryid:1 , questionid: 1},
      { id:4,title: 'Item 4',categoryid:2 , questionid: 1},
      { id:5,title: 'Item 5',categoryid:2 , questionid: 1},
      { id:6,title: 'Item 6',categoryid:2 , questionid: 1},
      { id:7,title: 'Item 7',categoryid:3 , questionid: 1},
      { id:8,title: 'Item 8',categoryid:3 , questionid: 1},
      { id:9,title: 'Item 9',categoryid:3 , questionid: 1},
      { id:10,title: 'Item 10',categoryid:4 , questionid: 1},
      { id:11,title: 'Item 11',categoryid:4 , questionid: 1},
      { id:12,title: 'Item 12',categoryid:4 , questionid: 1},
      { id:13,title: 'Item 13',categoryid:5 , questionid: 1},
      { id:14,title: 'Item 14',categoryid:5 , questionid: 1},
      { id:15,title: 'Item 15',categoryid:5 , questionid: 1},
      { id:16,title: 'Item 16',categoryid:6 , questionid: 1},
      { id:17,title: 'Item 17',categoryid:6 , questionid: 1},
      { id:18,title: 'Item 18',categoryid:6 , questionid: 1},
    ];

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

    categories = [
      { id:1,title: 'Service Plus',img: 'assets/img/plus.jpg' },
      { id:2,title: 'Cleaning',img: 'assets/img/cleaning.jpg' },
      { id:3,title: 'Air Conditioning',img: 'assets/img/Slider_-AC-Repair.png' },
      { id:4,title: 'Home',img: 'assets/img/elite-handyman2.jpg' },
      { id:5,title: 'Events',img: 'assets/img/evens.jpg' },
      { id:6,title: 'Learning',img: 'assets/img/teacher_2549217b.jpg' },
      
    ];
    taskers = [
      { id:1,name: 'joe kiven',title:'Cleaner',img: 'assets/img/46ce2bc282f5a62c5b6be5fd4430df9c.jpg' },
      { id:2,name: 'Suraj Ha',title:'Teacher',img: 'assets/img/Arnold_Faces_profile2.jpg' },
      { id:3,name: 'Aaron',title:'Family Support Specialist',img: 'assets/img/Blog_Main_Justin-1140x500.jpg' },
      { id:4,name: 'Alexis',title:'Digital Operator',img: 'assets/img/images.jpeg' },
      { id:5,name: 'Ali Khan',title:'Plumber',img: 'assets/img/profile-img.jpeg' },
      { id:6,name: 'Liza',title:'Electric Worker',img: 'assets/img/profile_img_2.jpg' },
      
     
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
      return this.http.get('assets/data/data.json')
        .map(this.processData);
    }
  }

   processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.schedule.forEach(day => {
      // loop through each timeline group in the day
      day.groups.forEach(group => {
        // loop through each session in the timeline group
        group.sessions.forEach(session => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach(speakerName => {
              let speaker = this.data.speakers.find(s => s.name === speakerName);
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }

          if (session.tracks) {
            session.tracks.forEach(track => {
              if (this.data.tracks.indexOf(track) < 0) {
                this.data.tracks.push(track);
              }
            });
          }
        });
      });
    });

    return this.data;
  }


    
  getMap() {
    return this.load().map(data => {
      return data.map;
    });
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
        return this.subcategories;
    }
    getCategories(){
        return this.categories;
    }


    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
        if (!forceRefresh && this.tourneyData[tourneyId]) {
            this.currentTourney = this.tourneyData[tourneyId];
            console.log('**no need to make HTTP call, just return the data'); 
            return Observable.of(this.currentTourney);
        }

        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
                this.tourneyData[tourneyId] = response.json();
                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            });
    }

    getCurrentTourney(){
        return this.currentTourney;
    }

    refreshCurrentTourney(){
        return this.getTournamentData(this.currentTourney.tournament.id, true); 
    }
}