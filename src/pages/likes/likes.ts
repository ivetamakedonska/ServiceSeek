/**
 * Created by ivetamakedonska on 9/26/16.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

//Services
import {LikesService} from '../../services/likesService';

//Models
import {LikesModel} from '../../models/likesModel';

//others
import { AngularFire } from 'angularfire2';


@Component({
  templateUrl: 'likes.html',
  selector: 'likes',
  styles: [`
     .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 5rem;
        max-height: 5rem;
     }

     .name {
       /*font-size: 4.3vw;*/
     }
     
    .item-ios p {
        font-size: 4vw;
    }
  `]

})
export class Likes {
  private data: any;
  private likes: Array<LikesModel>;
  constructor(params: NavParams,
              public nav: NavController,
              private af:AngularFire) {
    this.data = params.data;

    this.likes =this.data.item.likes;
  }
}
/**
 * Created by ivetamakedonska on 9/24/16.
 */
