import {Component, EventEmitter} from "@angular/core";
import {ViewController, NavController, AlertController, NavParams, Events} from "ionic-angular";
import { ProfilePage } from "../profile/profile";
import { LoginPage } from "../login/login";
import { ManagevoluntersPage } from "../managevolunters/managevolunters";
import { ContactusPage } from "../contactus/contactus";
import { HelpPage } from "../help/help";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {
  userLogin: any;
  constructor(
    public alertcntrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
   // public events: Events,
    public viewCtrl: ViewController) {
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      // this._anEmitter = navParams.data.theEmitter;
      // alert('_anEmitter111' + JSON.stringify(this._anEmitter));
      // this.events.subscribe('userImage', (user, time) => {
      //   // user and time are the same arguments passed in `events.publish(user, time)`
      //   alert('Welcome notification'+ user+ 'at'+ time);
      // });
    }

  close() {
    this.viewCtrl.dismiss();
  }

  profile(){
    // this.navCtrl.push(ProfilePage);
    this.navCtrl.push(ProfilePage, {
      editView: false
    });
  }

  editProfile(){
    this.navCtrl.push(ProfilePage, {
      editView: true
    });
    // this.navCtrl.push(ProfilePage);
  }

  async logout(){
    const alert = await this.alertcntrl.create({
      title: 'Alert',
      message: 'Do you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            localStorage.removeItem('UserLogin');
            localStorage.clear();
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });

    await alert.present();
  }

  Help(){
    this.navCtrl.push(HelpPage);
  }

  ContactUs(){
    this.navCtrl.push(ContactusPage);
  }

  volunteer(){
    this.navCtrl.push(ManagevoluntersPage);
  }

}

