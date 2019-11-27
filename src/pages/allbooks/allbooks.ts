import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

/**
 * Generated class for the AllbooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allbooks',
  templateUrl: 'allbooks.html',
})
export class AllbooksPage {
  isbookadding:boolean = false;
  iconName: string = "add";
  encodeData: any;
  bookname:any;

  constructor(
    public navCtrl: NavController, 
    public app:App,
    private barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllbooksPage');
  }

  addbook(){
    if(this.isbookadding == false){
      this.isbookadding = true;
      this.iconName = "close";
    }else{
      this.isbookadding = false;
      this.iconName = "add";
    }
  }

  encodedText(){
    alert('this.bookname' + this.bookname);
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'Kundan Sakpal').then((encodedData) => {
        this.encodeData = encodedData;
    }, (err) => {
        console.log("Error occured : " + err);
    });                 
 }
 
  bookDetails(){
    // this.navCtrl.push('BookdetailsPage');
    // this.navCtrl.p(BookdetailsPage);
    // this.app.getActiveNav().push('BookdetailsPage');
  }
}
