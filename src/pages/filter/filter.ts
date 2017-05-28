//other
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

//services

//Models
import {ItemModel} from '../../models/itemModel';


@Component({
  templateUrl: 'filter.html',
  selector: 'filter',
  styles: [`
    .check {
      color: #999
    }

    .button-full-ios {
     margin-top: -6%;
    }
  `]
})
export class Filter {
  private data: any;
  private items: Array<ItemModel>;
  private mostLiked: boolean = false;
  constructor(params: NavParams, public nav: NavController) {
    this.data = params.data;
    this.items = this.data.items;
  }

  mostLikedChecked() {
    this.mostLiked = !this.mostLiked;
  }

  filter() {

  }

  public event = {
    timeStarts: '10:00',
    minTime: '00:00',
    maxTime: '23:59'
  }
}
