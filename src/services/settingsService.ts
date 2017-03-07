import {Injectable} from '@angular/core';
import {UserModel} from '../models/userModel';

@Injectable()
export class SettingsService {

  private user: UserModel;



  constructor() {

  }

  getUser() {
    return this.user;
  }

}
