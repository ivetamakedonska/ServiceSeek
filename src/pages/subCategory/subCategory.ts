import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {List} from '../list/list';
import {UserService} from '../../services/userService';
import {RegisterFirm} from '../registerFirm/registerFirm';

import {SubCategoryService} from '../../services/subCategoryService';
import {SubCategoryModel} from '../../models/subCategoryModel';



@Component({
  templateUrl: 'subCategory.html',
  selector: 'sub-category',
  styles: [`
   .subCategory-btn {
        min-height: 13vh !important;
        max-height: 13vh !important;
    }
    .sub-icons {
        display: inline;
        width: 17vw;
        /*margin-left:4%;*/
    }
    .subcategory-name {
        display: inline;
        color: white;
        font-size: 4.7vw;
        margin-left: 5%;
        position: absolute;
        top: 50%;
    }
    
    .check-box {
        /*margin-left: 90% !important;*/
        display: inline!important;
    }
    
    .decline {
        margin-right: 0;
        width: 49%;
        margin-left: 1%;
    }
    
    .continue {
        margin-left: 0;
        width: 48%;
    }
    
    .item-ios p {
       font-size: 1.7rem !important;
    }
    
    .item-md p {
      font-size: 1.5rem !important;
    }
  `]
})
export class SubCategory {
  private data: any;
  private clicked: boolean;
  chosenCategroies: Array<any>;
  private subCategories: Array<SubCategoryModel>;
  constructor(params: NavParams, public nav: NavController, private _user: UserService, private _subCategories: SubCategoryService) {
    this.data = params.data;
    this.clicked = false;
    this.chosenCategroies =[];
    this._subCategories.getSubCategories(this.data.$key).subscribe( (a) =>
    {
      this.subCategories = a.map((e) => {
        return new SubCategoryModel(e);
      })
    });
  }

  openNavDetailsPage($key, name, color){
    let subData = {
      $key: $key,
      name: name,
      color: color
    }
    this.nav.push(List, subData);

  }

  createFirm() {
    this.clicked = true;
  }

  checkBoxClick(item) {
    this.chosenCategroies.push(item);
  }

  continue() {
    let data ={
      subIds: []
    };

    if(this.chosenCategroies.length >= 1) {
      this.chosenCategroies.forEach((e) => {
        data.subIds.push(e.$key);
      });
      this.nav.push(RegisterFirm, data);
    } else console.log('error')
  }

  declineClick() {
    this.clicked = false;
  }
}
