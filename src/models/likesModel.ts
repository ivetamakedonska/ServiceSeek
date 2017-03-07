import {CategoryModel} from "./categoryModel";
/**
 * Created by ivetamakedonska on 9/26/16.
 */
export class LikesModel {
  $key:string;

  uid: string;

  constructor({$key, uid})
  {
    this.$key = $key;

    this.uid = uid;
  }
}
/**
 * Created by ivetamakedonska on 9/26/16.
 */

// let data = {
//   data: 123,
//   name: 'iveta'
// }
//
// let c = new CategoryModel(data)
