import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { CallNumber } from '@ionic-native/call-number';


@IonicPage()
@Component({
  selector: 'page-mydonors',
  templateUrl: 'mydonors.html',
})
export class MydonorsPage {
  userLogin: any;
  donarsData: any;
  donorsform:any;
  birthdaydata: any;
  showsearch: boolean = false;
  data: any;
  constructor(
    private callNumber: CallNumber,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public apiProvider: RestApiProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.donorsform = 'donors';
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      this.getDonors();
      this.getBirthdays();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MydonorsPage');
  }

  filterItems(ev) {
    var val = ev.target.value;
    if (val.trim() !== '') 
    {
      this.donarsData = this.donarsData.filter((item) => 
      {
        return item.FullName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.ContactNo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.AcceptFlagInWords.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.DonationTowards.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }else{
      this.getDonors();
    }
  }

  openSearch(){
    if(this.showsearch == false){
      this.showsearch = true;
    }else{
      this.showsearch = false;
    }
  }

  getDonors(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {"EmailID": this.userLogin.EmailID,"RoleID":this.userLogin.RoleID };
    // alert('params' + JSON.stringify(params))
    this.apiProvider._postAPI("GetDonors", params).subscribe(res => {
      // Get Donars 
      loading.dismiss();
      //alert('GetDonorsResult Data ::'+ JSON.stringify(res));
      if(res.GetDonorsResult.length >0){
        this.data = res.GetDonorsResult;
        this.donarsData = this.data.reverse();
        // alert('donarsData' + JSON.stringify(this.donarsData[0]));
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

  async confirmDailNumber(itemNumber: any) {
    // alert('clusterDetail' + JSON.stringify(clusterDetail.ClusterID));
    const alert = await this.alertCtrl.create({
      title: 'Do you want call ?!',
      message: '',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.dailCallNumber(itemNumber);
        }
      }]
    });
    await alert.present();
  }

  dailCallNumber(number:any){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));  
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
