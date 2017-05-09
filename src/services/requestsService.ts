import {Injectable} from '@angular/core';

import { AngularFire } from 'angularfire2';

//Models
import {RequestModel} from '../models/requestModel';

//Services
import {UserService} from './userService';


@Injectable()
export class RequestsService {

  private requests: Array<RequestModel>;
  private messages: Array<RequestModel>;
  private newRequests: number;
  private newAnswers: number;

  constructor( private af: AngularFire, private _user: UserService) {
    af.database.list('/requests').subscribe( (a) =>
    {
      this.requests = a.map((e) => {
        return new RequestModel(e);
      })
    })
    if(isNaN(this.newRequests)) {
      this.newRequests = 0;
    }
    if(isNaN(this.newAnswers)) {
      this.newAnswers = 0;
    }
    this.getBusinessRequests(this._user.getUser().uid).subscribe( (a) =>
    {
      this.newRequests = 0;
      a.forEach(message => {
        if(message.opened == false) {
          this.newRequests++
        }
      })
    })


    af.database.list('/requests').subscribe( (a) =>
    {
      this.messages = a.map((e) => {
        return new RequestModel(e);
      })
    })
    this.getUserRequests(this._user.getUser().uid).subscribe( (a) =>
    {
      this.newAnswers = 0;

      a.forEach(message => {

        if(message.answered == true && message.openedByUser == false) {
          this.newAnswers++;

        }
      })
    })
  }

  getRequests() {
    return this.af.database.list('/requests');
  }

  getUserRequests($key) {
    return this.af.database.list('/requests', {
      query: {
        orderByChild: 'userId',
        equalTo: $key
      }})
  }

  getBusinessRequests($key) {
    return this.af.database.list('/requests', {
      query: {
        orderByChild: 'businessId',
        equalTo: $key
      }})
  }

  // getAcceptedRequests() {
  //   return this.af.database.list('/requests', {
  //     query: {
  //       orderByChild: 'condition',
  //       equalTo: 'Приет'
  //     }})
  // }
  getNewRequests() {
    return this.newRequests;
  }

  removeNewRequest() {
    if(this.newRequests > 0) {
      this.newRequests--;
    } else {
      this.newRequests =0;
    }
  }

  getNewAnswers() {
    return this.newAnswers;
  }

  removeNewAnswers() {
    this.newAnswers--;
  }

  // getAccepted() {
  //   return this.af.database.list('/requests', {
  //     query: {
  //       orderByChild: 'condition',
  //       equalTo: "Приет"
  //     }})
  // }



}
