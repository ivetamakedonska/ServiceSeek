import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';

//Components
import {MessageDetails} from '../request-details/request-details';
import {AcceptedRequests} from '../answeredRequests/accptedRequests';
import {DeclinedRequests} from '../answeredRequests/declinedRequest';
import {MakeAppointment} from '../makeAppointment/makeAppointment';

//Services
import {UserService} from '../../services/userService';
import {RequestsService} from '../../services/requestsService';

//Models
import {RequestModel} from '../../models/requestModel';
import {UserModel} from '../../models/userModel';



@Component({
  templateUrl: 'allRequests.html',
  selector: 'contacts',
  styles: [`
    .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 6rem;
        max-height: 6rem;
     }
     .time {
        font-size: 3.9vw;
     }

     ion-input .text-input {
        width: 80.5%;
     }
     .message-icon {
        float: right;
        margin-top: -19% !important;
        font-size: 13vw !important;
     }

     .condition {
        float: right;
        margin-top: -3%;
        font-size: 3.5vw;
        color: #999;
     }

     .accepted {
        background-color: #32CD32;
        width: 50%;
        display: inline-table;
        margin: 0;
        margin-right: -1%;
     }

     .declined {
        background-color: red;
        width: 50%;
        display: inline-table;
        margin: 0;
        margin-right: -1%;
     }

    .item-ios p {
        font-size: 3.8vw;
    }

     .delete-more {
        color:red;
        border-color: red;
        height: 36px !important;
     }

     .delete {
        width: 49%;
        display: inline-table;
        color: red;
        border-color: red;
        height: 36px !important;

     }

     .stop {
       width: 49%;
       display: inline-table;
       height: 36px !important;

     }

     .check-box {
        /*margin-left: 90% !important;*/
        display: inline!important;
    }

    .accept {
       width: 33%;
       display: inline-table;
       color: #32CD32;
       border-color: #32CD32;
       height: 36px !important;
    }

    .decline {
       width: 32%;
       display: inline-table;
       color: red;
       border-color: red;
       height: 36px !important;
    }

    .close {
       width: 32%;
       display: inline-table;
       height: 36px !important;
    }

    .close-icon {
      font-size: 2.5em;
    }

    .searchbar-ios {
      background: transparent !important;
    }

    .searchbar-md {
      background: transparent !important;
    }
    .toolbar-ios {}

    .not-seen {
      background: #f1f1f1;
    }
  `]
})
export class ContactPage {
  private messages: Array<RequestModel>;
  private requests: Array<RequestModel>;
  private chosenRequests: Array<RequestModel>;
  private user: UserModel;
  private clicked = false;

  constructor(public nav: NavController,
              private _messages: RequestsService,
              private _user: UserService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer

  ) {
    this.user = this._user.getUser();
    if(!this.user.bussinessClient) {
      this._messages.getUserRequests(this.user.uid).subscribe( (a) =>
      {
        this.messages = a.map((e) => {
          return new RequestModel(e);
        })
        this.requests = a.map((e) => {
          return new RequestModel(e);
        })
      })
      console.log(this.messages)

    } else {

      this._messages.getBusinessRequests(this.user.uid).subscribe( (a) =>
      {
        this.messages = a.map((e) => {
          return new RequestModel(e);
        })
        this.requests = a.map((e) => {
          return new RequestModel(e);
        })
      })

    }


    this.chosenRequests = [];

  }

  onMessageClick(message){
    const requests = this.af.database.list('/requests');
    let data = {
      message: message,
    }
    // console.log(message)
    if(this.user.bussinessClient){
      requests.update(message.$key, { opened: true });
      // this._messages.removeNewRequest();

    } else {
      requests.update(message.$key, {openedByUser: true});
      // this._messages.removeNewAnswers();
    }



    this.nav.push(MessageDetails, data);
  }

  onAcceptedClick(messages) {
    let data = {
      messages: messages
    }
    this.nav.push(AcceptedRequests, data);
  }

  onDeclinedClick(message) {
    let data = {
      message: message
    }
    this.nav.push(DeclinedRequests, data);
  }

  searchRequests(ev: any) {

    let val = ev.target.value;
    if(val.length > 0) {
      let found = [];
      this.requests.forEach( result => {
        let userName = result.userName.toLowerCase();
        let firmName = result.firmName.toLowerCase();
        let time = result.time;
        let date = result.date;
        let service = result.service.toLowerCase();
        if(userName.indexOf(val.toLowerCase()) > -1 || firmName.indexOf(val.toLowerCase()) > -1
          || time.indexOf(val.toLowerCase()) > -1 || date.indexOf(val.toLowerCase()) > -1 || service.indexOf(val.toLowerCase()) > -1) {
          found.push(result);
        }
      });
      // console.log(found);
      this.messages = found.map((e) => {
        return new RequestModel(e);
      })
    } else {
      this.messages = this.requests;
    }
  }

  isClicked() {
    this.clicked = true;
  }

  chooseDeleted(item) {
    this.chosenRequests.push(item);
  }

  delete() {
    const requests = this.af.database.list('/requests');
    if(this.chosenRequests != null) {
      this.chosenRequests.forEach( request => {
        requests.remove(request.$key);
        this.clicked = false;
      })
    }
  }

  stop() {
    this.clicked = false;
  }

  accept() {
    const requests = this.af.database.list('/requests');
    if(this.chosenRequests != null) {
      this.chosenRequests.forEach( request => {
        requests.update(request.$key, {
          condition: "Приет",
          iconName: "checkmark-circle",
          color: "#3cce02"
        });
        this.clicked = false;
        requests.update(request.$key, {answered: true});

      })
    }
  }

  decline() {
    const requests = this.af.database.list('/requests');
    if(this.chosenRequests != null) {
      this.chosenRequests.forEach( request => {
        requests.update(request.$key, {
          condition: "Отхвърлен",
          iconName: "close-circle",
          color: "red"
        });
        this.clicked = false;
        requests.update(request.$key, {answered: true});

      })
    }
  }

}
