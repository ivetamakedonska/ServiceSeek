/**
 * Created by ivetamakedonska on 10/9/16.
 */
import {Component} from '@angular/core';
import { AuthService } from '../../services/authService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NavController} from 'ionic-angular';
import { AngularFire} from 'angularfire2';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';


import {validPass} from '../errors/errors';

//components
import {Login} from '../logIn/login';
import {HomePage} from '../home/home'


@Component({
    templateUrl: 'signup.html',
    selector:'signup',
    styles: [`
     .logo {
        width: 11%;
        margin-left: 21%;
        display: inline;
        margin-bottom: 13%;
      }
      
     .logo2 {
        width: 45%;
        display: inline;
        margin-bottom: 14%;
        margin-left: 1%;

     }
      
     .content {
        background: #f8f8f8;
     }

    .info {
        width: 75%;
        margin-left: 13%;
        background: #f8f8f8;
    }
      
     .login{
        width: 75%;
        margin-left: 13%;
        margin-top: -2%;
     }
     
     .welcome {
        font-size: 2.4rem;
        color: #ff9933;
        text-align: center;
        margin-top: 13%;
        margin-bottom: 4%;

     }
     .user-checkbox {
        float: left;
        margin-left: 16%;
        margin-right: 2%;
      }
      
      .user-label {
        display: inline;
      }
      
      .bussinesman-label {
        display: inline;
        margin-left: 12%;
        margin-right: -35%;
      }
      
      .choose {
        font-size: 1.5rem;
        text-align: center;
        margin-top: -11%;
      }
      
      #name {
        margin-top: 3%;
        width: 75%;
        margin-left: 13%;
      }
      
      .button-ios-orange2 {
        margin-top: -6% !important;
      }
      
      .button-large-md {
          font-size: 1.6rem;
          margin-top: 3%;
          height: 2em;
     }
     
     .error {
        color: red;
     }
     
     .error-name {
        margin-left: 52%;
        color: red;
        margin-top: 2%;
     }
     
     .error-surname {
         margin-left: 44%;
         color: red;
        margin-top: 2%;
     }
     
     .error-email {
        margin-left: 48%;
        color: red;
        margin-top: 2%;
     }
     
     .error-pass {
         margin-left: 46%;
         color: red;
        margin-top: 2%;
     }
     
      .error-repeat { 
        margin-left: 41%;
        color: red;
        margin-top: 2%;
    }
    
    .name, .surname, .password, .repeat, .mail {
        color: #999;
    }
     
     .input-has-focus .label-ios[floating], .input-has-value .label-ios[floating] {
        color: #008ae6;
        margin-top: 2% !important;
      }
      .input-has-focus .label-md[floating], .input-has-value .label-md[floating] {
        color: #008ae6;
        margin-top: 2% !important;

      }
     
    
    .item-md.item-input.ng-invalid.ng-touched:not(.input-has-focus) .item-inner {
      border-bottom-color: transparent !important;
      box-shadow: inset 0 -1px 0 0 transparent !important;
    }
    
    .list-md .item-input.ng-invalid.ng-touched:not(.input-has-focus):last-child {
      border-bottom-color: transparent !important;
      box-shadow: inset 0 -1px 0 0 !important;
    }
    
    .item-md.item-input.ng-valid.input-has-value:not(.input-has-focus) .item-inner {
      border-bottom-color: transparent !important;
      box-shadow: inset 0 -1px 0 0 transparent !important;
    }
    
    .list-md .item-input.ng-valid.input-has-value:not(.input-has-focus):last-child {
      border-bottom-color: transparent !important;
      box-shadow: inset 0 -1px 0 0 transparent !important;
    }
    
    ion-label[stacked], ion-label[floating] {
      font-size: 1.5rem !important; 
      margin: 0 !important;
    }
  `]
})
export class SingUp {

    private isBussinessman = false;
    private errors = [];

    private register = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(255)
        ]),
        surname: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        email: new FormControl('', [
          validateEmail,
            Validators.required,
            Validators.maxLength(255)
        ]),
        password: new FormControl('', [
          // validPass(),
          Validators.required,
          Validators.maxLength(255)
        ]),
        repeat: new FormControl('', [
          Validators.required,
          Validators.maxLength(255)
        ])
    });

    private sumbited = false;
    private authState: FirebaseAuthState;

    constructor(private _auth: AuthService,
                public nav: NavController,
                private af: AngularFire,
                public auth$: AngularFireAuth) {
        this.authState = auth$.getAuth();
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }



    bussinessmanChosen() {
        this.isBussinessman = !this.isBussinessman;
    }


    signUp() {
      this.errors = [];
      this.sumbited = true;
      if(this.register.valid) {
        // const auth = firebase.auth();
        const email = this.register.controls['email'].value;
        const password = this.register.controls['password'].value;
        const repeat = this.register.controls['repeat'].value;
        if(repeat == password) {
            this.af.auth.createUser({ email: email, password: password });

            this.auth$.subscribe((user: FirebaseAuthState) => {
                console.log(user)

                const items = this.af.database.list('/userInfo');

              items.push({
                surname: this.register.controls['surname'].value,
                name: this.register.controls['name'].value,
                bussinessClient: this.isBussinessman,
                uid: user.uid
              });
            });
          // promise.catch(er =>
          // {
          //   if(er != null) {
          //     this.errors.push(er.message);
          //     console.log(this.errors)
          //   } else {
          //     this._auth.login();
          //   }
          // });

            // const promise = auth.createUserWithEmailAndPassword(email, password)
          //   .then((user) => {
          //     const items = this.af.database.list('/userInfo');
          //
          //     items.push({
          //       surname: this.register.controls['surname'].value,
          //       name: this.register.controls['name'].value,
          //       bussinessClient: this.isBussinessman,
          //       uid: user.uid
          //     });
          //   });
          // promise.catch(er =>
          // {
          //   if(er != null) {
          //     this.errors.push(er.message);
          //     console.log(this.errors)
          //   } else {
          //     this._auth.login();
          //   }
          // });
        }
      }
    }

    login() {
      this.nav.push(Login);
    }

    //
    // validPass() {
    //   if(this.register.controls['password'].value.length >= 6) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

  test(item) {
    console.log(item)
  }
}

export function validateEmail(c: any) {
  if(c.value == null || c.value.length == 0){
    return null;
  }
  let EMAIL_REGEXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return EMAIL_REGEXP.test(c.value) ? null :
  {
    email: true
  }
}


