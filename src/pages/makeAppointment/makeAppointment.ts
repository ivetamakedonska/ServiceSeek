import {Component} from '@angular/core';
import {NavController, NavParams, DateTime} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

//Models
import {ItemModel} from '../../models/itemModel';
import {UserModel} from '../../models/userModel';
import {RequestModel} from '../../models/requestModel'

//Services
import {UserService} from '../../services/userService';
import {RequestsService} from '../../services/requestsService';

//Components
import {HomePage} from '../../pages/home/home';


@Component({
  templateUrl: 'makeAppointment.html',
  selector: 'make-appointment',
  styles: [`
      ion-list:first-child {
        margin-top: 0px;
      }
      ion-list + ion-list {
        margin-top: 0;
      }
      .list {
        margin: 0;
      }
  `]

})
export class MakeAppointment {
  private data:any;
  private item:ItemModel;
  private user:UserModel;
  private checked: boolean;
  private selectedServices: any = null;
  private workingHours: Array<any> = [];
  private workingMinutes: Array<any> = [];
  private month: string;
  private newDate: Date;
  private day: string;
  private workTimeWeekdayStart: any;
  private workTimeWeekdayEnd: any;
  private acceptedData: any;
  private viewDate: Date = new Date();



  constructor(params:NavParams,
              public nav:NavController,
              public alerCtrl:AlertController,
              private af:AngularFire,
              private _user:UserService,
              private _requests: RequestsService,
              private _messages: RequestsService,
) {
    this.data = params.data;
    this.item = params.data.item;
    this.user = this._user.getUser();
    this.checked = false;
    this.newDate = new Date();



    if(this.newDate.getMonth() < 10) {
      let thisMonth = new Date().getMonth()+1;

      this.month = '0' + thisMonth.toString();
    } else {
      let thisMonth = new Date().getMonth()+1;
      this.month = thisMonth.toString()

    }

    if(this.newDate.getDate() < 10) {
      let thisDate = new Date().getDate();

      this.day = '0' + thisDate.toString();
    } else {
      let thisDate = new Date().getDate();
      this.day = thisDate.toString()

    }

    this.workTimeWeekdayStart = this.item.workTimeWeekdayStart;
    this.workTimeWeekdayEnd = this.item.workTimeWeekdayEnd;
    this.test();

  }



  public event = {
    // month:'2017-'+this.month+'-'+this.day,
    month: '2017-04-25',
    timeStarts: '12:00'
  }

  confirm(service, date, time, more) {

      let confirm = this.alerCtrl.create({
        title: 'Потвържадаване',
        message: 'Сигурни ли сте, че искате да потвърдите часа си?' + '<br>' +
        // 'Услуга: ' + services.service.value + '<br>' +
        'Дата: ' + date._text + '<br>' +
        'Час: ' + time._text + '<br>' +
        'Допълнително информация: ' + more.value,
        buttons: [
          {
            text: 'Отхвърляне',


          },
          {
            text: 'Потвържадаване',
            handler: () => {

              confirm.dismiss().then(() => {
                let confirm = this.alerCtrl.create({
                  title: 'Потвърдено',
                  message: "Избраният от Вас час беше изпратен за одобрение. Ще получите известие при отговор.",
                  buttons: ['ОК']
                });
                confirm.present();
              })
              this.nav.push(HomePage);

            }
          }
        ]
      });
      confirm.present()
      let monthNames = ["януари", "февруари", "март", "април", "май", "юни",
        "юли", "август", "септември", "октомври", "ноември", "декември"];

      let requests = this.af.database.list('/requests');
      if(this.item.img != null) {
      requests.push({
        firmName: this.item.name,
        firmImg: this.item.img,
        service: this.selectedServices.service,
        date: date._text,
        time: time._text,
        moreInfo: more.value,
        iconName: "time",
        condition: "Чакащ",
        color: "#4db8ff",
        askedTime: "изпратено на " + new Date().getDate() + " " + monthNames[new Date().getMonth()]
        + ' в ' + new Date().getHours() + ":" + new Date().getMinutes(),
        userName: this.user.name,
        userImg: this.user.photo,
        userId: this.user.uid,
        businessId: this.item.userId,
        opened: false,
        answered: false,
        openedByUser: false,
        duration: this.selectedServices.duration,
        price: this.selectedServices.price
      })
    } else {
      requests.push({
        firmName: this.item.name,
        firmImg: "",
        service: this.selectedServices.service,
        date: date._text,
        time: time._text,
        moreInfo: more.value,
        iconName: "time",
        condition: "Чакащ",
        color: "#4db8ff",
        askedTime: "изпратено на " + new Date().getDate() + " " + monthNames[new Date().getMonth()]
        + ' в ' + new Date().getHours() + ":" + new Date().getMinutes(),
        userName: this.user.name,
        userImg: this.user.photo,
        userId: this.user.uid,
        businessId: this.item.userId,
        opened: false,
        answered: false,
        openedByUser: false,
        duration: this.selectedServices.duration,
        price: this.selectedServices.price
      })
    }
  }

  check(index) {
    this.selectedServices = this.item.services[index];

    // this.checked = true;


  }

  test(){
    this._messages.getBusinessRequests(this.item.userId).subscribe( (a) =>
    {
      let requests = [];
      a.forEach(request => {
        if(request.condition == "Приет") {
          requests.push(request);
        }
      })


    let start = Number(this.workTimeWeekdayStart.split(':')[0]);
    let end = Number(this.workTimeWeekdayEnd.split(':')[0]);
    let appointement = this.event.timeStarts.split(':');
    this.workingHours = [];
    for(let i = start; i<=end-1; i++) {
      this.workingHours.push(i.toString());
    }
    requests.forEach(r => {
      if(r.duration.split(':')[1] == '00' && r.time.split(':')[1] == '00'){
        let duration = Number(r.duration.split(':')[0]);
        let beggining = Number(r.time.split(':')[0]);
        let removedTime = beggining + duration;
        this.workingHours.splice(this.workingHours.indexOf(removedTime.toString()), 1);
      }

        if(r.duration.split(':')[1] == '00' && r.time.split(':')[1] != '00'){

        }
    })

    // if(Number(appointement[0]) >= start && Number(appointement[1]) >= 0 &&  Number(appointement[0]) <= end-1 &&  Number(appointement[1]) < 60) {
    //   return true;
    // }
    // return false;
    })
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

      console.log(date)
  }
}
