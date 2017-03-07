import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/categoryModel';
import {ItemModel} from '../models/itemModel';
import {CommentsModel} from '../models/commentsModel';
import {LikesModel} from '../models/likesModel';

import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class CategoryService {

  private categories: Array<CategoryModel>=[];




  constructor( af: AngularFire) {
    af.database.list('/categories').subscribe( (a) =>
    {
      this.categories = a.map((e) => {
        return new CategoryModel(e);
      })
    });
  }

  getCategories() {
    return this.categories;
  }

}
