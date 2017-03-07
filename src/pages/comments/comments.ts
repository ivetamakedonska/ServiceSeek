/**
 * Created by ivetamakedonska on 9/26/16.
 */
import {Component} from '@angular/core';
import {NavController, NavParams, DateTime} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';

//Services
import {CommentService} from '../../services/commentService';
import {UserService} from '../../services/userService';


//Models
import {CommentsModel} from '../../models/commentsModel';
import {UserModel} from '../../models/userModel';

@Component({
  templateUrl: 'comments.html',
  selector: 'comments',
  styles: [`
     .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 5rem;
        max-height: 5rem;
        display: inline;
     }
     .note {
        font-size: 3.7vw;
        margin-left: 18%;
     }
     
     .name{
       margin-left: 18%;
       margin-top: -16%;
     }
     
     .comment {
       margin-left: 18%;
     }
     .comment-input {
        display: inline;
     }
     ion-input .text-input {
        width: 80.5%;
     }

     .send {
        margin: 0;
        position: absolute;
        height: 4.1rem;
        width: 15%;
        padding-bottom: 0;
     }
     
     .delete {
        float: right;
        margin-top: -9%;
        font-size: 8vw;
     }
     
     .toolbar {
        padding: 0 !important;
    }
     
     .item-ios p {
        font-size: 3.7vw;
    }
    
    .item-ios .item-button .delete{
       margin-top: -8%;
       font-size: 7vw;
    }
    
    .input-ios .text-input {
       margin-left: 3%;
    }
    
    .send-icon {
       color: white;
       font-size: 6vw;
    }
    
    .item-ios .item-button {
        margin-right: -4%;
    }
  `]

})
export class Comments {
  private data: any;
  private comments: Array<CommentsModel>;

  private user: UserModel;

  constructor(params: NavParams,
              public nav: NavController,
              private _user: UserService,
              public alertCtrl: AlertController,
              private af: AngularFire,
              private _comments: CommentService,
              private _DomSanitizationService: DomSanitizer
  ) {
    this.data = params.data;
    this.user = this._user.getUser();
    this._comments.getComments(this.data.item.$key).subscribe( (a) =>
    {
      this.comments = a.map((e) => {
        return new CommentsModel(e);
      })
    })
  }

  addComment(comment) {
    let monthNames = ["януари", "февруари", "март", "април", "май", "юни",
      "юли", "август", "септември", "октомври", "ноември", "декември"];
    let commentsAf = this.af.database.list('/comments');
    let itemsAf = this.af.database.list('/items');

    if(comment.value.length > 0) {

      if (new Date().getMinutes() <= 9) {
        commentsAf.push({
          comment: comment.value,
          img: this.user.photo,
          itemId: this.data.item.$key,
          name: this.user.name + " " + this.user.surname,
          time: "добавено на " + new Date().getDay() + " " + monthNames[new Date().getMonth()]
          + ' в ' + new Date().getHours() + ":0" + new Date().getMinutes(),
          userId: this.user.uid
        });

        comment.value = '';
        this.data.item.commentsCount++;
        itemsAf.update(this.data.item.$key, {commentsCount: this.data.item.commentsCount});
      } else {
        commentsAf.push({
          comment: comment.value,
          img: this.user.photo,
          itemId: this.data.item.$key,
          name: this.user.name + " " + this.user.surname,
          time: "добавено на " + new Date().getDay() + " " + monthNames[new Date().getMonth()]
          + ' в ' + new Date().getHours() + ":" + new Date().getMinutes(),
          userId: this.user.uid
        });

        comment.value = '';
        this.data.item.commentsCount++;
        itemsAf.update(this.data.item.$key, {commentsCount: this.data.item.commentsCount});

      }
    }
  }

  deleteComment(comment) {
    let commentsAf = this.af.database.list('/comments');


    let confirm = this.alertCtrl.create({
      title: 'Потвърждение',
      message: 'Сигурен ли сте, че искате да изтриете коментара? ',
      buttons: [
        {
          text: 'Отказ',
          handler: () => {

          }
        },
        {
          text: 'Потвърждаване',
          handler: () => {
            commentsAf.remove(comment.$key);
            this._comments.getComments(this.data.item.$key).subscribe( (a) =>
            {
              this.comments = a.map((e) => {
                return new CommentsModel(e);
              })
            })
          }
        }
      ]
    });
    confirm.present();

  }
}

