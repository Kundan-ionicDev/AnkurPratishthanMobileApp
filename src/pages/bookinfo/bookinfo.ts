import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bookinfo',
  templateUrl: 'bookinfo.html',
})
export class BookinfoPage {
 public value: any;
  strResult: any;

constructor(
  public nav: NavController, 
  public navParams: NavParams,
  public loadingCtrl: LoadingController, 
  public toastCtrl: ToastController) {
    this.value = navParams.get('bookInfo');
    this.strResult = "https://ankurpratishthan.com:8443/"+this.value.ThumbImage;
  }
}
