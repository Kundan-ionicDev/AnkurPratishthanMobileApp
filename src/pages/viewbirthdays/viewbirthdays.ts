import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ViewbirthdaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewbirthdays',
  templateUrl: 'viewbirthdays.html',
})
export class ViewbirthdaysPage {
  birthdaydata: any;
  userLogin: any;

  constructor(
    public loadingCtrl: LoadingController,
    public apiProvider: RestApiProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      this.getBirthdays();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewbirthdaysPage');
  }

  sendGreeting(item:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {
      "EmailID":item.EmailID,
      "Contact":item.MobileNo,
      "DonorID":item.DonorID
    };
    // alert('params' + JSON.stringify(params));
    this.apiProvider._postAPI("SendBirthdayEmailSMS", params).subscribe(res => {
      // Get Donars 
      // alert('GetDonorsResult Data ::'+ JSON.stringify(res.SendBirthdayEmailSMSResult));
      if(res.SendBirthdayEmailSMSResult =="Y"){
        // this.birthdaydata = res.SendBirthdayEmailSMSResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        this.apiProvider.presentAlert('Alert','Birthday Greeting sent sucessfully...');
        this.getBirthdays();
        loading.dismiss();
      }else{
        this.apiProvider.presentAlert('Alert','Please try again');
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }


  getBirthdays(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {"EmailID":this.userLogin.EmailID,"RoleID":this.userLogin.RoleID}
    this.apiProvider._postAPI("GetDonorBirthdays", params).subscribe(res => {
      // Get Donars 
      // alert('GetDonorsResult Data ::'+ JSON.stringify(res));
      if(res.GetDonorBirthdaysResult.length >0){
        this.birthdaydata = res.GetDonorBirthdaysResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

}
