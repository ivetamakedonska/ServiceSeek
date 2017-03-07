import {Injectable} from '@angular/core';
import {SubCategoryModel} from '../models/subCategoryModel';

import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class CommentService {

  private comments:FirebaseListObservable<any[]>;



  constructor( private af: AngularFire) {

  }

  getComments($key) {
    return this.af.database.list('/comments', {
      query: {
        orderByChild: 'itemId',
        equalTo: $key
      }})
  }

}
