/**
 * Created by ivetamakedonska on 10/9/16.
 */
import {Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/userService';
import {NavController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';

import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';


//Components
import {SingUp} from '../signUp/signup';

@Component({
    templateUrl: 'login.html',
    selector:'login',
    styles: [`
      .logo {
        margin-top: 22%;
        width: 28%;
        margin-left: 37%;
      }
      
     .logo2 {
        margin-left: 23%;
        width: 55%;
        margin-bottom: 4%;
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
       min-height: 3vw;
       height: 10vw;
       margin-left: 13%;
     }
     
     .button-large-md {
          font-size: 1.6rem;
     }
     
     .button-ios-blue2 {
       margin-top: -6% !important;
     }
     
     .list-md {
          margin: -1px 0 5px 0;
     }
     
     .error-msg {
        color: red;
        margin: 2%;
        margin-left: 50%;
     }
     
      .input-has-focus .label-ios[floating], .input-has-value .label-ios[floating] {
        color: #008ae6;
      }
      .input-has-focus .label-md[floating], .input-has-value .label-md[floating] {
        color: #008ae6;
      }
   `]
})
export class Login {

  private login = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ])
  });

  private authState: FirebaseAuthState;


  private submited = false;

    constructor(
                private _user: UserService,
                private nav: NavController,
                private af: AngularFire,
                public auth$: AngularFireAuth) {
      this.authState = auth$.getAuth();
      auth$.subscribe((state: FirebaseAuthState) => {
        this.authState = state;
      });
    }

    signIn() {
      const email = this.login.controls['email'].value;
      const password = this.login.controls['password'].value;
      this.submited = true;
      // const promise = auth.signInWithEmailAndPassword(email, password);
      // promise.catch(er => console.log(er.message));
    //   auth.onAuthStateChanged( firebaseUser => {
    //     if(firebaseUser) {
    //       this._user.setUser(firebaseUser);
    //
    //     } else {
    //       console.log('not logged in');
    //     }
    //   })

      this.af.auth.login({ email: email, password: password });

      this.auth$.subscribe((state: FirebaseAuthState) => {
        if (state) {
          this.af.database.list('/userInfo', {
            query: {
              orderByChild: 'uid',
              equalTo: state.uid
            }})
              .subscribe( (a) =>
              {
                if(a.length > 0){
                  let k = {
                    name: a[0].name,
                    surname: a[0].surname,
                    uid: a[0].uid,
                    email: state.auth.email,
                    bussinessClient: a[0].bussinessClient,
                    $key: a[0].$key,
                    photo: a[0].photo
                  }
                  this._user.setUser(k);
                }

              });
        } else {
          console.log('not')
        }
      });

      // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error: any) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   console.log(error.message);
      // });
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     this.af.database.list('/userInfo', {
      //       query: {
      //         orderByChild: 'uid',
      //         equalTo: user.uid
      //       }})
      //       .subscribe( (a) =>
      //       {
      //         if(a.length > 0){
      //           let k = {
      //             name: a[0].name,
      //             surname: a[0].surname,
      //             uid: a[0].uid,
      //             email: user.email,
      //             bussinessClient: a[0].bussinessClient,
      //             $key: a[0].$key,
      //             photo: a[0].photo
      //           }
      //           this._user.setUser(k);
      //         }
      //
      //       });
      //   } else {
      //     console.log('not')
      //   }
      // });
    }

  signup() {
    this.nav.push(SingUp);
  }

}
