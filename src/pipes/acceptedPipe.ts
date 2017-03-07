import { Pipe, PipeTransform } from '@angular/core';
import {UserService } from '../services/userService';


@Pipe({name: 'accepted'})
export class AcceptedPipes implements PipeTransform {
    transform(items: Array<any>): Array<any> {
        let accepted = [];
      if(items != null) {
        items.forEach((item) => {
          if (item.condition == 'Приет') {
            accepted.push(item);

          }
        })
      }

        return accepted;

    }
}

@Pipe({name: 'declined'})
export class DeclinedPipes implements PipeTransform {
    transform(items: Array<any>): Array<any> {
        let declined = [];
      if(items != null) {
        items.forEach((item) => {
          if (item.condition == 'Отхвърлен') {
            declined.push(item);

          }
        })
      }
        return declined;
    }
}
@Pipe({name: 'waiting', pure: false})
export class WaitingPipes implements PipeTransform {
    transform(items: Array<any>): Array<any> {
        let waiting = [];
      if(items != null) {
        items.forEach((item) => {
          if (item.condition == 'Чакащ') {
            waiting.push(item);

          }
        })
      }
        return waiting;
    }
}

@Pipe({name: 'bussinessItems'})
export class BussinessItems implements PipeTransform {
    constructor(private _user: UserService){

    }
    transform(items: Array<any>): Array<any> {
        let bussinessItems = [];

      if(items != null){
          items.forEach((item) => {

            if(item.userId == this._user.getUser().uid) {
              bussinessItems.push(item);

            }
          })
        }
      return bussinessItems;
    }
}
