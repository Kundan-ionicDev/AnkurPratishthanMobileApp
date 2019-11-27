import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      {
        text:"Rich dad poor dad", src:"assets/img/barcode.png"
      },{
        text:"Anthology",src:"assets/img/barcode.png"
      },{
        text:"Square Panda",src:"assets/img/barcode.png"
      },{
        text:"TechM",src:"assets/img/barcode.png"
      },{
        text:"ICICI",src:"assets/img/barcode.png"
      },{
        text:"Bank of America",src:"assets/img/barcode.png"
      },{
        text:"Joe",src:"assets/img/barcode.png"
      },{
        text:"Albert",src:"assets/img/barcode.png"
      },{
        text:"Gilbert",src:"assets/img/barcode.png"
      },{
        text:"Kanoon",src:"assets/img/barcode.png"
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

}
