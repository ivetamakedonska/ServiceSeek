import {Injectable} from '@angular/core';
import {AuthService} from './authService';
import {UserModel} from '../models/userModel';


declare const firebase;

@Injectable()
export class UserService {

    private user: any = {};

    constructor(private _auth: AuthService) {

    }

    setUser(user) {
      this.user = new UserModel(user);
      this._auth.login();
    }


    getUser() {
        return this.user;
    }


}


