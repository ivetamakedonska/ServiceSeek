import {Injectable} from '@angular/core';

import { AngularFire } from 'angularfire2';


@Injectable()
export class SubCategoryService {

  // private subCategories:FirebaseListObservable<any[]>;



  constructor( private af: AngularFire) {

  }

  getSubCategories($key) {
    return this.af.database.list('/subCategories', {
      query: {
        orderByChild: 'categoryId',
        equalTo: $key
      }})
  }

}
