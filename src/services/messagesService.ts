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
  private newMessagesUser: number;
  private newMessagesFirm: number;


  constructor( private af: AngularFire, private _user: UserService) {

    af.database.list('/messages').subscribe( (a) => {

      a.forEach(chat => {
        this.newMessagesUser = 0;
        this.newMessagesFirm = 0;

        if (chat.seenByUser == false) {
          this.newMessagesUser++;
        }
        if (chat.seenByFirm == false) {
          this.newMessagesFirm++;
        }
      })
      this.requests = a.map((e) => {
        return new ConversationModel(e);

      })
    })
  }

  getChosen($key) {
    return this.af.database.list('/messages', {
      query: {
        // orderByChild: '$key',
        equalTo: $key,
        orderByKey: true
      }
    })
  }


  getUserMessages($key) {
    return this.af.database.list('/messages')
  }

  getNewUserMsg() {
    return this.newMessagesUser;
  }

  getNewFirmMsg() {
    return this.newMessagesFirm;
  }
}
