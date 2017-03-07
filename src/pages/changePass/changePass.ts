import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {AboutPage} from '../settings/settings';



@Component({
    selector: 'change-password',
    templateUrl: 'changePass.html',
    styles: [`
       .icon {
        color: #dedede;
       }
       
       .save {
        background-color: #dedede;
       }
       
       .button-ios {
        margin-top: -6%;
       }
  `]
})
export class ChangePass {
    constructor(public nav: NavController, public toastCtrl: ToastController) {

    }

    onSaveClick() {
        this.nav.push(AboutPage);
    }

    presentToast() {
        const toast = this.toastCtrl.create({
            message: 'Паролата Ви беше сменена успешно.',
            showCloseButton: true,
            closeButtonText: 'ОК',
            position: 'top'
        });
        toast.present();
    }
}
