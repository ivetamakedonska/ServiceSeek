import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';



//Models
import {RequestModel} from '../../models/requestModel';
import {UserModel} from '../../models/userModel';

//Services
import {UserService} from '../../services/userService';
import {RequestsService} from '../../services/requestsService';


//Components
import {MessageDetails} from '../request-details/request-details';



@Component({
    templateUrl: ' declinedRequest.html',
    selector: 'declined',
    styles: [`
      .item-ios p {
        font-size: 3.8vw;
      }
      
      .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 6rem;
        max-height: 6rem;
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
       
      .searchbar-md {
        background: transparent !important;
      }
      
       .searchbar-ios {
         background: transparent !important;
      }
      
      .time {
        font-size: 1.5rem;
      }

  `]
})
export class DeclinedRequests {
    private messages: Array<RequestModel>;
    private requests: Array<RequestModel>;
    private chosenRequests: Array<RequestModel>;
    private user: UserModel;
    private clicked: boolean;
    constructor(public nav: NavController,
                private _messages: RequestsService,
                private _user: UserService,
                private af:AngularFire,
                private _DomSanitizationService: DomSanitizer
    ) {
      this.user = this._user.getUser();
      this._messages.getBusinessRequests(this.user.uid).subscribe( (a) =>
      {
        this.messages = a.map((e) => {
          return new RequestModel(e);
        })
        this.requests = a.map((e) => {
          return new RequestModel(e);
        })
      })
      this.chosenRequests = [];
      this.clicked = false;
    }

    onMessageClick(message){
        let data = {
            message: message
        }
        this.nav.push(MessageDetails, data);
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
}
