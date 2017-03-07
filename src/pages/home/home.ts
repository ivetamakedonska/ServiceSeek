import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SubCategory} from '../subCategory/subCategory';
import {CategoryService} from '../../services/categoryService';
import {Search} from '../search/search';


@Component({
    templateUrl: 'home.html',
    selector:'home',
    styles: [`
      .logo {
         display: inline;
         width: 10%;
         margin-left: 26%;
         margin-top: 2%;
      }
      
      .logo-2 {
        display: inline;
        width: 36%;
        margin-bottom: 2%;
        margin-left: 1%;
      }
      .search {
        display: inline;
        float: right;
        font-size: 4vw;
        margin-top: 2% !important;
      }
      
      .icon {
         font-size: 6vw;
      }
      
      .home-page-categories-btn {
         width: 50%;
         display: inline-table;
         /*min-height: 20.5vh !important;*/
         /*max-height: 20.5vh !important;*/
         
         /*display: inline !important;*/
         /*border: 0px !important;*/
         /*border-top: 0px !important;*/
       }
       .icons {
         width: 53%;
         margin-left: auto;
         margin-right: auto;
         display: block;
       }
       .category-names {
         color: white;
         text-align: center;
         margin-top: 5%;
         font-size: 3.9vw;
       }
       
       .label-md {
          margin: 14px 8px 13px 0;
       }
       
       .button-clear-ios {
          font-size: 4vw !important;
       }   
       
       .button-clear-md {
          font-size: 4.7vw !important;
      }
       
       .icon-ios-blue1 {
          font-size: 8vw;
       }
       .tabs-ios .tab-button {
         min-height: 79px;
       }
       
       .item-ios {
          margin-top: -1%;
          min-height: 21vh !important;
       }
       
       .tabs-ios .tab-button-icon {
          height: 10vw;
       }
       
       
       .item-md p {
         font-size: 3.6vw !important;
        }
        
        .item-ios p {
          font-size: 1.3rem !important;
        }
    `]
})
export class HomePage {

  constructor(public nav: NavController, private _category: CategoryService) {

  }

  openNavDetailsPage($key, name, color){
    let data = {
      $key: $key,
      name: name,
      color: color
    }
    this.nav.push(SubCategory, data);
  }

  onSearchClick(items) {

    this.nav.push(Search);
  }

}
