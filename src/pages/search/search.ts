//other
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

//Components
import {Items} from '../items/items';

//Services
import {ListService} from '../../services/listService';



@Component({
  templateUrl: 'search.html',
  selector: 'search',
  styles: [`

  `]

})
export class Search {

  searchQuery: string = '';

  private items: any = [];
  constructor(params: NavParams, public nav: NavController, private _items: ListService) {

  }


  getItems(ev: any) {

    let val = ev.target.value;
    if(val.length > 0) {
      this.items = this._items.findItems(val);
    }
  }

  onItemClick(item) {
    let data = {
      item: item
    }
    this.nav.push(Items, data);  }

}
/**
 * Created by ivetamakedonska on 9/24/16.
 */
