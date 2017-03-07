import {Injectable} from '@angular/core';
import {SubCategoryModel} from '../models/subCategoryModel';

import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class LikesService {

  private likes:FirebaseListObservable<any[]>;

  constructor( private af: AngularFire) {

  }

  getLikes($key) {
    return this.af.database.list('/likes', {
      query: {
        orderByChild: 'itemId',
        equalTo: $key
      }})
  }

}
