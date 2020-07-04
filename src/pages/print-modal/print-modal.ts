import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PrintModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-print-modal',
  templateUrl: 'print-modal.html',
})
export class PrintModalPage {
  userId: number;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log('UserId', navParams.get('userId'));
    this.userId = navParams.get('userId');
  }

  dismissModal() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrintModalPage');
  }

}
