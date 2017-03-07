import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../services/authService';
import {Login} from '../logIn/login';
import {SingUp} from '../signUp/signup';
import { AngularFire, FirebaseListObservable } from 'angularfire2';




@Component({
  templateUrl: 'authentication.html',
  selector:'authentication',
  styles: [`
      .logo {
        margin-top: 24%;
        width: 28%;
        margin-left: 37%;
      }
      
     .logo2 {
        margin-left: 23%;
        width: 55%;
     }
      
     .content {
        background: #f8f8f8;
     }
     
     #top-hr {
       background: #4db8ff;
       width: 70%;
     }
     
     .login{
       width: 71%;
       height: 7%;
       margin-left: 14%;
     }
     .or {
      color: #4db8ff;
      font-size: 5.4vw;
      margin-left: 43%;
      margin-top: 1%;
      margin-bottom: 1%;
     }
     
     #bottom-hr {
       width: 70%;
       background: #ff9933;
     }
     
     .button-large-md {
        font-size: 1.7rem !important;
     }
    `]
})
export class AuthenticationPage {
  items: FirebaseListObservable<any[]>;
  constructor(private _auth: AuthService, public nav: NavController, af: AngularFire) {

  }

  signInClick() {
    this.nav.push(Login);
  }

  signUpClick() {
    this.nav.push(SingUp)
  }





}
