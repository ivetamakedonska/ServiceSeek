import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, ToastController} from 'ionic-angular';
import {UserService} from '../../services/userService';
import { AngularFire } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera }from 'ionic-native';
import {DomSanitizer} from '@angular/platform-browser';




//Components
import {HomePage} from '../home/home';

//Models
import {ItemModel} from '../../models/itemModel';



@Component({
    templateUrl: 'registerFirm.html',
    selector:'registerFirm',
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
        margin-right: 0 !important;
     }

     .save {
        width: 110%;
        margin-left: -5%;
     }
     .change-pass {
        background-color: #dedede;
     }

     .button-full-ios {
        margin-top: -6% !important;
     }

     .price {
        width: 49%;
        margin-left: 51%;
     }

     .duration {
         width: 49%;
         margin-top: -2.55em;

     }

     .add-more {
        width: 60%;
        margin-left: 19%;
        margin-top: 3%;
     }

     .more-services {
      margin: -1px 0 0px 0 !important;
     }

     .days {
      color: grey;
     }

     .label-md {
    margin: 12px 8px 3px 0 !important;
    }
    `]
})
export class RegisterFirm {

    private data: any;
    private number: number;
    private services: Array<any> = [
      {
        duration: null,
        price: null,
        service: null
      }
    ];
    private lastImage: string = null;

    private firm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      workTimeSaturdayStart: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      workTimeSundayStart: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      workTimeWeekdayStart: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      workTimeSaturdayEnd: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      workTimeSundayEnd: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      workTimeWeekdayEnd: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      moreInfo: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ])
    });


    constructor( params: NavParams,
                public nav: NavController,
                private _user:UserService,
                 private af: AngularFire,
                 private actionSheetCtrl: ActionSheetController,
                 public toastCtrl: ToastController,
                 private _DomSanitizationService: DomSanitizer
    ) {
        this.data = params.data;
      if(isNaN(this.number)) {
        this.number= 0;
      }
    }

      public event = {
        // month:'2017-'+this.month+'-'+this.day,
        timeStarts: '1:00'
      }

    save() {
        let name = this.firm.controls['name'].value;
        let city = this.firm.controls['city'].value;
        let address = this.firm.controls['address'].value;
        let workTimeWeekdayStart = this.firm.controls['workTimeWeekdayStart'].value;
        let workTimeWeekdayEnd = this.firm.controls['workTimeWeekdayEnd'].value;
        let workTimeSaturdayStart = this.firm.controls['workTimeSaturdayStart'].value;
        let workTimeSaturdayEnd = this.firm.controls['workTimeSaturdayEnd'].value;
        let workTimeSundayStart = this.firm.controls['workTimeSundayStart'].value;
        let workTimeSundayEnd = this.firm.controls['workTimeSundayEnd'].value;
        let moreInfo = this.firm.controls['moreInfo'].value;


      const items = this.af.database.list('/items');

      items.push({
        name: name,
        img: this.lastImage,
        workTimeWeekdayStart: workTimeWeekdayStart,
        workTimeWeekdayEnd: workTimeWeekdayEnd,
        workTimeSaturdayStart : workTimeSaturdayStart,
        workTimeSaturdayEnd: workTimeSaturdayEnd,
        workTimeSundayStart: workTimeSundayStart,
        workTimeSundayEnd: workTimeSundayEnd,
        city: city,
        address: address,
        moreInfo:moreInfo,
        clicked: false,
        userId: this._user.getUser().uid,
        subCategoryId: this.data.subIds[0],
        likesCount: 0,
        commentsCount: 0,
        services: this.services

      })
      console.log(this.services)
        this.nav.push(HomePage);
    }

  addMore(){

    this.services.push(
      {
        duration: null,
        price: null,
        service: null
      })
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
      let item;
      const lastItemAf = this.af.database.list('/items')

    }, (err) => {
      console.log(err)
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }

}
