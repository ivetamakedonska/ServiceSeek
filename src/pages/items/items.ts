//Components
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FullChat} from '../fullChat/fullChat';
import {Comments} from '../comments/comments';
import {MakeAppointment} from "../makeAppointment/makeAppointment";
import {EditFirm} from "../editFirm/editFirm";

//Services
import {UserService} from "../../services/userService";
import {LikesService} from '../../services/likesService';
import {ListService} from '../../services/listService';



//Models
import {LikesModel} from '../../models/likesModel';
import {CommentsModel} from '../../models/commentsModel';
import {UserModel} from '../../models/userModel';
import {ItemModel} from '../../models/itemModel';


//other
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';

declare const firebase;

@Component({
  templateUrl: 'items.html',
  selector: 'item',
  styles: [`
     .items {
        display: inline-block;
     }

     .item-img {
        border: 1px solid #dedede;
        width: 100%;
        max-width: 7rem;
        min-height: 7rem;
        border-radius: 1rem;
        float: left;
     }

     .item-name {
        font-size:  5vw;
        margin-top: -25%;
        margin-left: 61%;
     }

     .under-name {
        color: #666;
        margin-left: 61%;
     }

     .likes {
       font-size: 6vw;
       margin-left: 75%;
       color: #dedede;
       margin-left: 128%;
       margin-top: -48%;
     }

     .likes-icon {
        font-size: 12vw;
     }

     .item-workTime {
        color: #666;
        margin-left: 5%;
     }

     .item-more {
        color: #666;
     }
     .item-info {
        font-size: 4.4vw;
        color: #666;
    }

    .likes-and-comments{
        margin-top: -6%;
    }

    .send-message {
       width: 49%;
       display: inline-table;
       margin-top: 2%;
       background-color: #999;
    }

    .make-appointment {
       width: 49%;
       display: inline-table;
       margin-top: 2%;
    }
     .edit {
       width: 49%;
       display: inline-table;
       margin-top: 2%;
       margin-left: 27%;
    }

    .likes-comments-icons {
      margin-right: 3%;
    }
    .item-ios .item-name {
      margin-left: 61% !important;
    }
    .item-ios .under-name {
      margin-left: 61% !important;
    }

    .show-more {
      margin-left: 30%;
    }
  `]

})
export class Items {
  private item:any;
  private id: any;
  private color:any;
  private likes:Array<LikesModel>;
  // private comments:Array<CommentsModel>;
  private user: UserModel;
  private showed: number = 1;
  private more: boolean = false;
  private likeClicked: boolean = false;
  private items: Array<ItemModel>;



  constructor(private params:NavParams, private nav:NavController, private _user:UserService,
              private _likes:LikesService,
              private af:AngularFire,
              private _DomSanitizationService: DomSanitizer,
              private _items:ListService,

  ) {
    this.id = params.data.item.$key;
    this.user = this._user.getUser();

    this.color = params.data.color;
    this._items.getItems(params.data.item.subCategoryId).subscribe( (a) =>
    {
      this.items = a.map((e) => {
        return new ItemModel(e);
      })
      this.items.forEach(i => {
        if(i.$key == this.id) {
          this.item=i;
          this.likes = this.item.likes;

        }
      })
    })


  }

  onButtonLikesClick(item) {
    // let data = {
    //   item: item
    // }
    // this.nav.push(Likes, data);
  }

  onButtonCommentsClick(color, item) {
    let data = {
      color: color,
      item: item,
    }
    this.nav.push(Comments, data);
  }

  onLikeClick(btn, thisColor) {
    // let itemsRef = this.af.database.list('/items/' + item.$key);
    // let likesRef = itemsRef.child('likes');

    if(this.item.isLiked(this.user.uid)) {
      let likeKey = this.item.getLikeKey(this.user.uid);
      let itemsRef = this.af.database.list('/items/' + this.item.$key + '/likes/' + likeKey);
      // btn.style.color = thisColor;
      itemsRef.remove();

    } else {

      let ref = this.af.database.list('/items/' + this.item.$key + '/likes');
      ref.push({
        uid: this.user.uid
      });

    }
    // this.likeClicked = !this.likeClicked;
    // let itemsRef = this.af.database.list('/items/' + item.$key);
    // let likesRef = this.af.database.list('/items/' + item.$key + '/likes');
    // if(item.isLiked(this.user.uid)) {
    //   let likeKey = item.getLikeKey(this.user.uid);
    //   let likeRef = this.af.database.list('/items/' + item.$key + '/likes/' + likeKey);
    //
    //   likeRef.remove();
    //
    // } else {
    //   // btn._elementRef.nativeElement.style.color = thisColor;
    //
    //   likesRef.push({
    //     uid: this.user.uid
    //   });
    //
    // }
  }

  makeAppointement(color,item) {
    let data = {
      color: color,
      item: item
    }
    this.nav.push(MakeAppointment, data);

  }

  editFirm(item, color) {
    let data = {
      item: item,
      color: color
    }
    this.nav.push(EditFirm, data)
  }

  showMore() {
    this.more = !this.more;

    this.showed = this.item.services.length;
  }

  showLess() {
    this.more = !this.more;
    this.showed = 1;
  }

  sendMessage(item) {
    let data;
    let ref = this.af.database.list('/messages');
    let uid = this.user.uid;
    let msgRef = this.af.database.list('/messages', {
      query: {
        orderByChild: 'userId',
        equalTo: uid
      }})
      .subscribe((messages) => {
      let index = -1;
      for(let i=0; i<messages.length; i++) {
        if(messages[i].businessId == item.$key) {
          index = i;

          break;
        }

      }

      if(index!= -1 ){
        data = {
          chat: messages[index]
        }

        this.nav.push(FullChat, data)
      } else {
        let info = {
          businessId: item.$key,
          firmImg: item.img,
          firmName: item.name,
          messages: {},
          userId: this.user.uid,
          userImg: this.user.photo,
          userName: this.user.name,
          seenByUser: true,
          seenByFirm: true,
          answeredByFirm: false,
          answeredByUser: false
        }
        ref.push(
          info
            );

            let data =
            {
              chat: info
            };
            this.nav.push(FullChat, data)
      }
        msgRef.unsubscribe();


      })

  }
}

/**
 * Created by ivetamakedonska on 9/24/16.
 */
