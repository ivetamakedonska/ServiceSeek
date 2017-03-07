import {Injectable, EventEmitter, Output} from '@angular/core';

@Injectable()
export class AuthService {

  private is_auth = false;
  @Output() signIn: EventEmitter<any> = new EventEmitter();

  constructor() {


  }

  login() {
    this.is_auth = true;
    this.signIn.emit(this.is_auth);

  }


  signOut() {
    this.is_auth = false;
    this.signIn.emit(this.is_auth);

  }


}
