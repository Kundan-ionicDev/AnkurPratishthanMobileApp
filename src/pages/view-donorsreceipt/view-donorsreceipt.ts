import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewDonorsreceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-donorsreceipt',
  templateUrl: 'view-donorsreceipt.html',
})
export class ViewDonorsreceiptPage {
  userLogin: any;
  donorData(donorData: any) {
    throw new Error("Method not implemented.");
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      this.donorData = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDonorsreceiptPage');
  }

}
