import * as firebase from 'firebase';

import {Injectable} from '@angular/core';

import { AngularFire } from 'angularfire2';

//Models
import {ConversationModel} from '../models/conversationModel';

//Services
import {UserService} from './userService';


@Injectable()
export class MessagesService {

  private requests: Array<ConversationModel>;
  private messages: Array<ConversationModel>;
  private newRequests: number;
  private newAnswers: number;


  constructor( private af: AngularFire, private _user: UserService) {

    af.database.list('/messages').subscribe( (a) =>
    {
      this.requests = a.map((e) => {
        return new ConversationModel(e);
      })
    })
  }

  getChosen($key) {
    return this.af.database.list('/messages', {
      query: {
        orderByChild: '$key',
        equalTo: $key,
        orderByKey: true
      }})
  }

  getUserMessages($key) {
    return this.af.database.list('/messages')
  }

}
