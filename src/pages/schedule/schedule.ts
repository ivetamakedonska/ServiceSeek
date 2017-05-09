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


//Models
import {UserModel} from '../../models/userModel';
import {RequestModel} from '../../models/requestModel';


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

   events: CalendarEvent[] = [{
     title: 'Resizable event',
     color: {
       primary: '#1e90ff',
       secondary: '#D1E8FF'
     },
     start: setHours(setMinutes(new Date(), 0), 4),
     end: setHours(setMinutes(new Date(), 0), 6)

   }, {
     title: 'A non resizable event',
     color: {
       primary: '#1e90ff',
       secondary: '#D1E8FF'
     },
     start: setHours(setMinutes(addDays(new Date(), 1), 0), 5),
     end: setHours(setMinutes(addDays(new Date(), 1), 0), 6)
   }];

   private user: UserModel;
   private requests: Array<RequestModel>;



  constructor(public nav: NavController,
              private _user: UserService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer,
              private _requests: RequestsService,
  ) {
    this.user = this._user.getUser();

    this._requests.getBusinessRequests(this.user.uid).subscribe( (a) =>
    {
      this.requests = a.map((e) => {
        return new RequestModel(e);
      })
      this.requests.forEach(r => {
        if(r.condition = 'Приет') {
          console.log(r);
          let today = new Date();
          // let date = Date.parse(r.date);
          let days =   (Date.parse(r.date) - today.getTime())/ (1000 * 60 * 60 * 24);
          this.events.push({
            title: r.service,
            color: {
              primary: '#1e90ff',
              secondary: '#D1E8FF'
            },
            start: setHours(setMinutes(addDays(new Date(), days), 0), 4),
            end: setHours(setMinutes(addDays(new Date(), days), 0), 5)

          })
        }
      })
    });

  }


  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

      console.log(date)
  }
}
