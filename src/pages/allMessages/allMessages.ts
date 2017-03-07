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
    
     .delete-more {
        color:red;
        border-color: red;
        height: 36px !important;
     }
     
     .delete {
        width: 49%;
        display: inline;    
        color: red;
        border-color: red;
        height: 36px !important;

     }
   
     .stop {
       width: 49%;
       display: inline;
       height: 36px !important;

     }
     
     .check-box {
        /*margin-left: 90% !important;*/
        display: inline!important;
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
export class AllMessages {
  private userMessages: Array<ConversationModel>;
  private businessMessages: Array<ConversationModel>;
  private message: MessageModel;
  private user: UserModel;

  constructor(public nav: NavController,
              private _messages: MessagesService,
              private _user: UserService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer

  ) {
    this.user = this._user.getUser();
    if(!this.user.bussinessClient) {
      this._messages.getUserMessages(this.user.uid).subscribe( (a) =>
      {
        this.userMessages = a.map((e) => {
          return new ConversationModel(e);
        })
        console.log(this.userMessages[0].messages[Object.keys(this.userMessages[0].messages)[Object.keys(this.userMessages[0].messages).length - 1]]);

        this.businessMessages = a.map((e) => {
          return new ConversationModel(e);
        })
      })
    } else {

      this._messages.getBusinessMessages(this.user.uid).subscribe( (a) =>
      {
        this.userMessages = a.map((e) => {
          return new ConversationModel(e);
        })
        this.businessMessages = a.map((e) => {
          return new ConversationModel(e);
        })
      })

    }


  }

  onMessageClick(chat) {
    let data = {
      chat: chat
    }
    this.nav.push(FullChat, data);
  }


}
