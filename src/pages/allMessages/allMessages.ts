import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';

//Components
import {FullChat} from '../../pages/fullChat/fullChat'

//Services
import {UserService} from '../../services/userService';
import {MessagesService} from '../../services/messagesService';

//Models
import {ConversationModel} from '../../models/conversationModel';
import {UserModel} from '../../models/userModel';
import {MessageModel} from "../../models/messageModel";



@Component({
  templateUrl: 'allMessages.html',
  selector: 'all-messages',
  styles: [`
    .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 5.5rem;
        max-height: 5.5rem;
     }
     
     ion-input .text-input {
        width: 78%;
     }
    
    .item-ios p {
        font-size: 3.8vw;
     }
     
     .date {
        float: right;
        margin-top: -5%;
     }
     
     .name {
        margin-bottom: 2%;
     }
     
     
     .not-seen {
      background: #f1f1f1;
    }
    .toolbar-ios {}
    
    .not-seen {
      background: #f1f1f1;
    }
    

  `]
})
export class AllMessages {
  private userMessages: Array<ConversationModel>;
  private businessMessages: Array<ConversationModel>;
  private messages:  Array<any> = [];
  private allMessages: Array<any> = [];
  private user: UserModel;
  private convCount: number = 0;

  constructor(public nav: NavController,
              private _messages: MessagesService,
              private _user: UserService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer

  ) {
    this.user = this._user.getUser();
      this._messages.getUserMessages(this.user.uid).subscribe( (a) =>
      {
        this.userMessages = a.map((e) => {
          return new ConversationModel(e);
        })

        this.userMessages.forEach(chat => {
          if(chat.messages != null) {
            this.allMessages.push(chat);
          }
        })

        this.userMessages.forEach(chat => {
          this.allMessages.forEach(conv => {
            if(conv == chat ) {
              this.convCount++;
            }
          })
        })
      })
    console.log(this.convCount);
    this._messages.getUserMessages(this.user.uid).subscribe( (a) =>
    {
      this.userMessages.forEach(chat => {
        if(this.convCount <= this.userMessages.length) {
          this.messages.push(chat);
        }

      })

    })

  }

  onMessageClick(chat) {
    let data = {
      chat: chat
    }
    this.nav.push(FullChat, data);
    if(this.user.bussinessClient) {
      let conversation = this.af.database.list('/messages');
      conversation.update(chat.$key, {
        seenByFirm: true
      });
    } else {
      let conversation = this.af.database.list('/messages');
      conversation.update(chat.$key, {
        seenByUser: true
      });
    }

  }


}
