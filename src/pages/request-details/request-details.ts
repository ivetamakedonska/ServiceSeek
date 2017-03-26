import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';

//Components
import {ContactPage} from '../allRequests/allRequests';

//Services
import {RequestsService} from '../../services/requestsService';
import {UserService} from '../../services/userService';


//Models
import {RequestModel} from '../../models/requestModel';


@Component({
  templateUrl: 'request-details.html',
  selector: 'messages-details',
  styles: [`

     .message-img {
        border: 1px solid #dedede;
        width: 100%;
        max-width: 7rem;
        min-height: 7rem;
        border-radius: 1rem;
        float: left;
     }

     .message-name {
        font-size:  5vw;
        margin-top: -12%;
        margin-left: 27%;
     }
      .under-name {
        color: #999;
        margin-left: 27%;
     }

     .message-info {
        font-size: 4.4vw;
        color: #666;
    }
    .message-condition {
      font-size: 6vw !important;
      color: #999;
      display: inline;
      margin-left: 35%;
    }

    .condition-icon {
      font-size: 10vw;
      margin-left: 1%;
    }
    
    .accept {
        background-color: #32CD32;
        width: 49%;
    }
    
    .decline {
        background-color: red;
        width: 49%;
    }
    
    .delete-business-client {
        height: 2.6em;
        font-size: 4.3vw;
        width: 49%;
        display: inline-table;
    }
    
    .decline2 {
       width: 49%;
       display: inline-table;
       font-size: 4.3vw;
       height: 2.6em;

    }
    
    .accept2 {
      width: 49%;
      display: inline-table;   
      font-size: 4.3vw;
      height: 2.6em;

    }

    .delete-user {
      height: 2.6em;
      font-size: 4.3vw;
    }

  `]
})
export class MessageDetails {
  private message: any;
  private messages: Array<RequestModel>;


  constructor(params: NavParams,
              public nav: NavController,
              public toastCtrl: ToastController,
              private _user: UserService,
              private _messages: RequestsService,
              private af:AngularFire,
              private _DomSanitizationService: DomSanitizer

  ) {
    this.message = params.data.message;
    this._messages.getRequests().subscribe( (a) =>
    {
      this.messages = a.map((e) => {
        return new RequestModel(e);
      })
    })
  }


  acceptRequest() {
    const toast = this.toastCtrl.create({
      message: 'Заявката беше потвърдена',
      closeButtonText: 'ОК',
      position: 'top',
      duration: 3000
    });
    toast.present();
    let requests = this.af.database.list('/requests');
    requests.update(this.message.$key, {
      iconName: "checkmark-circle",
      condition: "Приет",
      color: "#3cce02"
    });
    requests.update(this.message.$key, {answered: true});
    this._messages.removeNewAnswers();
    this.nav.push(ContactPage);
  }

  declineRequest(message) {
    const toast = this.toastCtrl.create({
      message: 'Заявката беше отказана.',
      closeButtonText: 'ОК',
      position: 'top',
      duration: 3000
    });
    toast.present();
    let requests = this.af.database.list('/requests');
    requests.update(this.message.$key, {
      iconName: "close-circle",
      condition: "Отхвърлен",
      color: "red"
    });
    this.nav.push(ContactPage);  }

  deleteMessage(id) {
    let requests = this.af.database.list('/requests');
    requests.remove(this.message.$key);
    this.nav.push(ContactPage);
    const toast = this.toastCtrl.create({
      message: 'Известието беше изтрито.',
      closeButtonText: 'ОК',
      position: 'top',
      duration: 3000
    });
    toast.present();
    this.messages.splice(id-1, 1);

  }

  a(a) {

  }
}
