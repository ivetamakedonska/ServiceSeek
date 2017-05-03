
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera }from '@ionic-native/camera';
import {DomSanitizer} from '@angular/platform-browser';



//Components
import {HomePage} from '../home/home';


@Component({
    templateUrl: 'editFirm.html',
    selector: 'editFirm',
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
        margin-top: 5%;
        width: 110%;
        margin-left: -5%;
     }
     .change-pass {
        background-color: #dedede;
     }
  `]

})
export class EditFirm {
    private item: any;
    private color: any;
    private items: FirebaseListObservable<any>;
    private lastImage: string = null;

    private edit: FormGroup;

    constructor(params: NavParams,
                public nav: NavController,
                public toastCtrl: ToastController,
                private af: AngularFire,
                private actionSheetCtrl: ActionSheetController,
                private _DomSanitizationService: DomSanitizer,
                public Camera:Camera
              ) {
        this.item = params.data.item;
        this.color = params.data.color;
        this.items = this.af.database.list('/items');
    }


  save(position) {

    let name = this.edit.controls['name'].value;
      let city = this.edit.controls['city'].value;
      let address = this.edit.controls['address'].value;
      let workTimeWeekdayStart = this.edit.controls['workTimeWeekdayStart'].value;
      let workTimeWeekdayEnd = this.edit.controls['workTimeWeekdayEnd'].value;
      let workTimeSaturdayStart = this.edit.controls['workTimeSaturdayStart'].value;
      let workTimeSaturdayEnd = this.edit.controls['workTimeSaturdayEnd'].value;
      let workTimeSundayStart = this.edit.controls['workTimeSundayStart'].value;
      let workTimeSundayEnd = this.edit.controls['workTimeSundayEnd'].value;
      let moreInfo = this.edit.controls['moreInfo'].value;

      this.items.update(this.item.$key, {
        name: name,
        city: city,
        address: address,
        workTimeWeekdayStart: workTimeWeekdayStart,
        workTimeWeekdayEnd: workTimeWeekdayEnd,
        workTimeSaturdayStart: workTimeSaturdayStart,
        workTimeSaturdayEnd: workTimeSaturdayEnd,
        workTimeSundayStart: workTimeSundayStart,
        workTimeSundayEnd: workTimeSundayEnd,
        moreInfo: moreInfo,
        services: this.item.services
      });
    //
      this.nav.push(HomePage);

      let toast = this.toastCtrl.create({
          message: 'Успешно запазихте промените',
          duration: 2000,
          position: position
      });
     toast.present();
    }

    ngOnInit() {
      this.edit = new FormGroup({
        name: new FormControl(this.item.name, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        city: new FormControl(this.item.city, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        address: new FormControl(this.item.address, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        workTimeSaturdayStart: new FormControl(this.item.workTimeSaturdayStart, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        workTimeSundayStart: new FormControl(this.item.workTimeSundayStart, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        workTimeWeekdayStart: new FormControl(this.item.workTimeWeekdayStart, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        workTimeSaturdayEnd: new FormControl(this.item.workTimeSaturdayEnd, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        workTimeSundayEnd: new FormControl(this.item.workTimeSundayEnd, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        workTimeWeekdayEnd: new FormControl(this.item.workTimeWeekdayEnd, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        moreInfo: new FormControl(this.item.moreInfo, [
          Validators.required,
          Validators.maxLength(255)
        ])
      });
    }

  changePhotoOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.Camera.PictureSourceType.CAMERA);
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
      destinationType : this.Camera.DestinationType.DATA_URL,
      sourceType : sourceType,
      allowEdit : true,
      encodingType: this.Camera.EncodingType.PNG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: true
    };


    this.Camera.getPicture(options).then((imageData) => {
      this.lastImage = imageData;
      const itemsAf = this.af.database.list('/items')

      itemsAf.update(this.item.$key, { img: this.lastImage });
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
/**
 * Created by ivetamakedonska on 9/24/16.
 */
