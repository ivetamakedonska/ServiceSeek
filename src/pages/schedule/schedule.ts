import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { setHours, setMinutes, addDays } from 'date-fns';

//Components

//Services
import {UserService} from '../../services/userService';
import {RequestsService} from '../../services/requestsService';
import {ListService} from '../../services/listService';


//Models
import {UserModel} from '../../models/userModel';
import {RequestModel} from '../../models/requestModel';
import {ItemModel} from '../../models/itemModel'


@Component({
  templateUrl: 'schedule.html',
  selector: 'schedule',
  styles: [`
    .month {
      display: block;
      margin-left:24%;
    }

    .previous {
      display: block;
      margin-left:21%;
      margin-top-7% !important;
    }

    .today {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    h2 {
      margin-top: 2%;
      margin-bottom: 2%;
      font-size: 1.3em;
    }

    .item {
      margin-bottom: -7% !important;
    }
  `]
})
export class Schedule {

  view: string = 'month';

   viewDate: Date = new Date();

  //  events: CalendarEvent[] = [];

   @Input() view2: string;

  @Input() locale: string = 'en';

   @Output() viewChange: EventEmitter<string> = new EventEmitter();

   @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

   private events: CalendarEvent[] = [];

   private user: UserModel;
   private requests: Array<RequestModel>;
   private items: Array<ItemModel>;
   private chosenFirm: any;


  constructor(public nav: NavController,
              private _user: UserService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer,
              private _requests: RequestsService,
              private _items: ListService,
              private navCtrl: NavController
  ) {
    this.user = this._user.getUser();

    this._items.getUserFirms(this.user.uid).subscribe( (a) =>
    {
      this.items = a.map((e) => {
        return new ItemModel(e);
      })
      this.chosenFirm = this.items[0]

    })


    this._requests.getBusinessRequests(this.user.uid).subscribe( (a) =>
    {
      this.requests = a.map((e) => {
        return new RequestModel(e);
      })
      this.requests.forEach(r => {
        // console.log(r)
        if(r.firmName == this.chosenFirm.name && r.condition == 'Приет') {
          let today = new Date();
          // let date = Date.parse(r.date);
          let days = (Date.parse(r.date) - today.getTime())/ (1000 * 60 * 60 * 24);
          let timeHours = Number(r.time.split(':')[0]);
          let timeMin = Number(r.time.split(':')[1]);
          let durationHours = Number(r.duration.split(':')[0]);
          let durationMin = Number(r.duration.split(':')[1]);
          let min, hours;
          if(timeMin+durationMin>60) {
            hours = Number(timeHours) + Number(durationHours) + (timeMin+durationMin)/2;
            min = (Number(timeMin) + Number(durationMin))%2;
          } else {
            hours = Number(timeHours) + Number(durationHours);
            min = Number(timeMin) + Number(durationMin);

          }
          this.events.push({
            title: r.service,
            color: {
              primary: '#1e90ff',
              secondary: '#D1E8FF'
            },
            start: setHours(setMinutes(addDays(new Date(), days), timeMin), timeHours),
            end: setHours(setMinutes(addDays(new Date(), days), min), hours)

          })
        }
      })
    });
  }


  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

      console.log(date)
  }

  chooseFirm(event) {
    this.chosenFirm = event;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);


   }


  onChangeView(view){
    this.view = view;
  }
}
