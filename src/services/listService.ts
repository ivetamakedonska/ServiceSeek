//other
import {Injectable} from '@angular/core';
import { AngularFire } from 'angularfire2';

//models
import {ItemModel} from '../models/itemModel';


@Injectable()
export class ListService {

  private items:Array<ItemModel>;

  constructor( private af: AngularFire) {
    af.database.list('/items').subscribe( (a) =>
    {
      this.items = a.map((e) => {
        return new ItemModel(e);
      })
    });

  }

  getItems($key) {
    return this.af.database.list('/items', {
      query: {
        orderByChild: 'subCategoryId',
        equalTo: $key
      }})
  }

  getUserFirms($key) {
    return this.af.database.list('/items', {
      query: {
        orderByChild: 'userId',
        equalTo: $key
      }})
  }
  getItem($key) {
    return this.af.database.list('/items', {
      query: {
        orderByChild: 'userId',
        equalTo: $key
      }})
  }

  findItems(place: string) {
    let found = [];
    this.items.forEach( result => {
      let name = result.name.toLowerCase();
      let address = result.address.toLowerCase();
      let city = result.city.toLowerCase();
      if(name.indexOf(place.toLowerCase()) > -1 || address.indexOf(place.toLowerCase()) > -1 || city.indexOf(place.toLowerCase()) > -1) {
        found.push(result);
      }
    });
    return found;

  }

}
