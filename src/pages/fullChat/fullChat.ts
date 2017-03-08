import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';


//Components
import {MessageDetails} from '../request-details/request-details';
import {AcceptedRequests} from '../answeredRequests/accptedRequests';
import {DeclinedRequests} from '../answeredRequests/declinedRequest';

//Services
import {UserService} from '../../services/userService';
import {MessagesService} from '../../services/messagesService';

//Models
import {ConversationModel} from '../../models/conversationModel';
import {UserModel} from '../../models/userModel';
import {MessageModel} from "../../models/messageModel";



@Component({
  templateUrl: 'fullChat.html',
  selector: 'full-chat',
  styles: [`
    .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 3.5rem;
        max-height: 5.5rem;
     }
     
     ion-input .text-input {
        width: 78%;
     }
    
    .item-ios p {
        font-size: 4.2vw;
        display: inline-block;
        padding: 3%;
        border-radius: 10%;
     }
     
     .my-message {
        color: white;
        background-color: #387ef5;
        float: right;
     }
     
     .other-message {
        color: black;
        background-color: #f1f1f1;
     }
     
     .list-ios .item-block .item-inner {
        border-bottom: 0.55px solid white !important;
      }
      
      .item-ios .item-block .item-inner {
        border-bottom: 0.55px solid white !important;
      }
     
     .my-date {
        font-size: 3vw !important;
        margin-left: 63%;
        margin-top: 1%;
     }
     
     .other-date {
        font-size: 3vw !important;
        margin-bottom: 1%;
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
    
    .send {
        margin: 0;
        padding-bottom: 0;
        font-size: 1.45rem;
     }
  
     .comment-input {
        width: 63%;
        display: inline;
     }
     
     .toolbar-content-ios {
        display: flex;   
     }
     
     .toolbar-content-md {
        display: flex;   
     }
     
     ion-input .text-input {
         width: 63%;
     }
     
     .add-photo {
        float:left;
        font-size: 1.6rem;
        color: #999;
     }

    .list-ios .item-block .item-inner {
      border-bottom: 0px solid white !important;
     }
     
    .item-ios .item-block .item-inner {
      border-bottom: 0px solid white !important;
     }
     
     .list-md .item-block .item-inner {
      border-bottom: 0px solid white !important;
     }
     
    .item-md .item-block .item-inner {
      border-bottom: 0px solid white !important;
     }
  `]
})
export class FullChat {

  private user: UserModel;
  private data:any;
  private chat: any;
  private messages: any;
  private keys: Array<any>;



  constructor(public nav: NavController,
              private _user: UserService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer,
              private params: NavParams,
              private _messages: MessagesService,


  ) {
    this.data = this.params.data;
    this.chat = this.data.chat;
    this._messages.getChosen(this.data.chat.$key).subscribe( (a) =>
    {
      console.log(a);
      this.messages = a[0].messages;
      this.keys = this.messages ? Object.keys(this.messages) :[];

      // console.log(this.userMessages[0].messages[Object.keys(this.userMessages[0].messages)[Object.keys(this.userMessages[0].messages).length - 1]]);

    })
    this.user = this._user.getUser();

  }

  sendMessage(message) {
    // console.log(message)
    if(message.value != '') {
      let chat = this.af.database.list('/messages/' + this.chat.$key + '/messages');
      chat.push({
        date: new Date().getHours() + ':' + new Date().getMinutes(),
        isBusinessClient: this.user.bussinessClient,
        message: message.value
      })
      message.value = '';
      // this.messages.push(message);
      console.log(message);

    }
  }

}
