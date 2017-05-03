import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {AuthenticationPage} from '../pages/authentication/authentication';
import { AuthService } from '../services/authService';

import {UserService} from '../services/userService';

import { AngularFire } from 'angularfire2';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

import { TabsPage } from '../pages/tabs/tabs';
declare const firebase: any;


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage:any = AuthenticationPage;

  constructor(platform: Platform, _auth: AuthService, private af: AngularFire, private _user: UserService,public auth$: AngularFireAuth, public StatusBar: StatusBar) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.StatusBar.styleDefault();

      auth$.getAuth();
      auth$.subscribe((state: FirebaseAuthState) => {
        if (state != null) {
          this.af.database.list('/userInfo', {
            query: {
              orderByChild: 'uid',
              equalTo: state.uid
            }})
            .subscribe( (a) =>
            {
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

              this.rootPage = TabsPage;

            });
          //
        } else {
          this.rootPage = AuthenticationPage;
        }
      });
      // var user = firebase.auth().currentUser;

      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     this.af.database.list('/userInfo', {
      //       query: {
      //         orderByChild: 'uid',
      //         equalTo: user.uid
      //       }})
      //       .subscribe( (a) =>
      //       {
      //         let k = {
      //           name: a[0].name,
      //           surname: a[0].surname,
      //           uid: a[0].uid,
      //           email: user.email,
      //           bussinessClient: a[0].bussinessClient,
      //           $key: a[0].$key,
      //           photo: a[0].photo
      //         }
      //
      //         this._user.setUser(k);
      //
      //         this.rootPage = TabsPage;
      //
      //       });
      // //
      //   } else {
      //     this.rootPage = AuthenticationPage;
      //   }
      // });
    });


    _auth.signIn.subscribe((e) => {
      if(e) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = AuthenticationPage;
      }
    });
     // this.rootPage = AuthenticationPage;


  }

  ngOnInit() {

  }
}
