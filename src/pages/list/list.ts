//Components
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Items} from '../items/items';
import {Search} from '../search/search';
import {Filter} from '../filter/filter';
import {RegisterFirm} from '../registerFirm/registerFirm'

//Services
import {UserService} from '../../services/userService';
import {ListService} from '../../services/listService';
import {LikesService} from '../../services/likesService';
import {CommentService} from '../../services/commentService';

//Models
import {ItemModel} from '../../models/itemModel';
import {LikesModel} from '../../models/likesModel';
import {CommentsModel} from '../../models/commentsModel';
import {UserModel} from '../../models/userModel';


//others
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  templateUrl: 'list.html',
  selector: 'list',
  styles: [`
   .list-btn {
      min-height: 17.5vh !important;
      max-height: 13vh !important;
      border-bottom: 1px solid #dedede;
      padding: 0;
      position: relative;
      /*z-index: 1000;*/
    }

      #filter {
       margin: 0;
       margin-right: -1%;
       width: 50%;
      }

      #search {
       margin: 0;
       width: 49.9%;
      }
      .items {
      display: inline-block !important;
        width: 100%;
      }
      .item-img {
        float: left;
        width: 32vw;
        height: 20%;
        border: 1px solid #dedede;
      }
      .item-info {
        margin-left: 34vw;
        margin-top: 3%;
        font-size: 4.4vw;
      }
      .comments {
        margin-left: 4%;
        margin-top: 3vw;
      }
       .likes-2 {
        margin-top: 3vw;
      }
      .comments-icon{
        margin-right: 5%;
      }
      
      .likes {
        font-size: 10vw;
        color: #dedede;
        height: 50px;
        width: 30px !important;
        padding: 0;
        position: absolute;
        margin-top: -9%;
        margin-left: 17%;
    }
    
    .likes-icon {
      margin-left: 10vw;
    }

    .count-likes {
      font-size: 3vw;
      margin-top: 13vw;
      margin-left: 20vw;
      color: #dedede;
    }
   
    .button-clear-ios  {
        margin-left: 18% !important;
    }
    
    .button-clear-md  {
        margin-left: 18% !important;
    }
    
   .button-outline-ios.activated {
       background-color: transparent !important;
   }
   
  `]
})
export class List {
  private subData: any;
  private items: Array<ItemModel>;
  private likes: Array<any> = [];
  private comments: Array<CommentsModel>;
  private user: UserModel;
  private likeClicked: boolean = false;
  private clickedKey: string;

  // private newLikes: any;

  constructor(params: NavParams,
              public nav: NavController,
              private _user: UserService,
              private _items:ListService,
              private _likes: LikesService,
              private _comments: CommentService,
              private af: AngularFire,
              private _DomSanitizationService: DomSanitizer
  ) {
    this.subData = params.data;
    this._items.getItems(this.subData.$key).subscribe( (a) =>
    {
      this.items = a.map((e) => {
        return new ItemModel(e);
      })
    })

    this.user = this._user.getUser();
  }

  openNavDetailsPage(item, color)
  {
    let data = {
      item: item,
      color: color
    }
    this.nav.push(Items, data);
  }

  onLikeClick(btn, thisColor, like, item, e) {
    this.likeClicked = !this.likeClicked;
    this.clickedKey = item.$key;
    e.preventDefault();
    e.stopPropagation();

    // let itemsRef = this.af.database.list('/items/' + item.$key);
    // let likesRef = itemsRef.child('likes');


    if(item.isLiked(this.user.uid)) {
      let likeKey = item.getLikeKey(this.user.uid);
      let itemsRef = this.af.database.list('/items/' + item.$key + '/likes/' + likeKey);

      itemsRef.remove();
      console.log(this.likeClicked)

    } else {
      btn._elementRef.nativeElement.style.color = thisColor;
      let ref = this.af.database.list('/items/' + item.$key + '/likes');
      ref.push({
        uid: this.user.uid
      });
      console.log(this.likeClicked)

    }
  }


  onSearchClick(items) {
    let data = {
      items: items
    }
    this.nav.push(Search, data);
  }

  onFilterClick(color, items) {
    let data = {
      color: color,
      items: items
    }
    this.nav.push(Filter, data);
  }

  onRegisterClick(subData) {
    let data = {
      subIds: []
  }
  data.subIds.push(subData.$key);
    this.nav.push(RegisterFirm, data);
  }
}

