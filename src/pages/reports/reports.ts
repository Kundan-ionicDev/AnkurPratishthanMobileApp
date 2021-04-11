import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  userLogin: any;
  donarsData: any;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public apiProvider: RestApiProvider,
    public navParams: NavParams) {
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      this.getDonors();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ReportsPage');
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
      if(res.GetDonorsResult.length >0){
       this.donarsData = res.GetDonorsResult.filter(i=> {
          return i.CreatedBy === this.userLogin.EmailID
          && i.AcceptFlag === 1;
        });
      }
      else{
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

}
