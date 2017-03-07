import { Component } from '@angular/core'
import { NavController,ActionSheetController, ToastController, Platform, LoadingController, Loading,AlertController } from 'ionic-angular';
import { Camera, File } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import {DomSanitizer} from '@angular/platform-browser';


import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';


//Services
import {UserService} from "../../services/userService";
import {AuthService} from "../../services/authService";

//Models
import { UserModel } from "../../models/userModel";

//Components
import {ChangePass} from '../changePass/changePass';
import {AuthenticationPage} from '../authentication/authentication';

declare let cordova: any;
let FilePath: any = window["IonicNative"].FilePath;


@Component({
  selector: 'page-about',
  templateUrl: 'settings.html',
  styles: [`
     .avatar {
        border-radius: 1rem;
        border: 1px solid #dedede;
        max-width: 8rem;
        max-height: 8rem;
        margin-left: 36%;
     }

     .change-photo {
       margin-left: 31%;
       font-size: 3.7vw;
     }

     .header {
        color: #858585;
     }

     .icon {
        color: #dedede;
        margin-right: 0;
     }

     .change-pass-or-sign-out {
        color: #858585;
     }
     
     .item-ios ion-icon[item-left], .item-ios ion-icon[item-right] {
        margin-right: 2%;
    }
     
    .button-ios {
        margin-top: -6%;
    }
  `]
})
export class AboutPage {
  private user: UserModel;
  lastImage: string = null;
  fileName: string = null;
  private test: any;
  private authState: FirebaseAuthState;


  constructor(public nav: NavController,
              private _bussinessman: UserService,
              private _auth: AuthService,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              private af: AngularFire,
              public alertCtrl: AlertController,
              private _DomSanitizationService: DomSanitizer,
              public auth$: AngularFireAuth
  ) {
    this.user = this._bussinessman.getUser();
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  changePass() {
    this.nav.push(ChangePass);
  }

  onSaveClick() {
    const toast = this.toastCtrl.create({
      message: 'Данните Ви бяха сменени успешно.',
      showCloseButton: true,
      closeButtonText: 'ОК',
      position: 'top'
    });
    toast.present();
  }

  signOut() {
    this.nav.push(AuthenticationPage);
    this.authState = this.auth$.getAuth();
    console.log(this.authState)
    this.auth$.subscribe((state: FirebaseAuthState) => {
      state = null;
      this.authState = state;
    });
    this.af.auth.logout();
  }

  changePhotoOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {

    var options = {
      quality : 40,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : sourceType,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: true
    };


    Camera.getPicture(options).then((imageData) => {
      this.lastImage = imageData;
      let usersAf = this.af.database.list('/userInfo');
      usersAf.update(this.user.$key, { photo: this.lastImage });
    }, (err) => {
      console.log(err)
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }

  public testUpload() {
    let usersAf = this.af.database.list('/userInfo');
      usersAf.update(this.user.$key, { photo: this.lastImage });
  }

}
