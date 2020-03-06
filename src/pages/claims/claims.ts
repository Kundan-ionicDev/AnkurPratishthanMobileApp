import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ClaimsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-claims',
  templateUrl: 'claims.html',
})
export class ClaimsPage {
  items: { requested: string; requestedFor: string; requestedDate: string; bookname: string; author: string; icon: string; }[];
  message: string;
  requestsData: any;

  constructor(
    public loadingCtrl: LoadingController,
    public apiProvider: RestApiProvider,
    public toastController: ToastController,
    public navCtrl: NavController, 
    public alert: AlertController,
    public navParams: NavParams) {
      this.initialize();
    }
  
    ionViewDidLoad() {
    }
  
  
    ViewRequestDetail(){
  
    }
  
    initialize(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
      let params = 
      {
        "EmailID": "kundansakpal@gmail.com"
      }
      this.apiProvider._postAPI("GetRequests", params).subscribe(res => {
        // Get Claim Requests
        // alert('GetRequests Result ::'+ JSON.stringify(res.GetRequestsResult));
        if(res.GetRequestsResult.length >0){
          this.requestsData = res.GetRequestsResult;
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert!','Something went wrong. Please try again!!!');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error!',err);
        loading.dismiss();
      });
    }
  
    ///------ Below are the commands for managing requests
    // Command 2 for Cancel Book Request
    // Command 3 for Return Book Request
    // Command 4 for Accept Book Request
    
    ManageRequests(id:any,itemData:any){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
      // alert('member Id' + this.memberId +'bookData :'+ JSON.stringify(this.bookData));
      let params = 
      {
        "cmd": id,
        "BookID": itemData.BookID,
        "MemberID": itemData.MemberID,
        "senderEmailID": "kundansakpal@gmail.com",
        "RequestID": itemData.RequestID
      };
  
      let message ="";
      if(id == 2){
        message = "Request Cancelled Sucessfully"
      }else if(id == 3){
        message = "Request Returned Sucessfully"
      }else if(id == 4){
        message = "Request Accepted Sucessfully"
      }else{
  
      }
      // alert('params' + JSON.stringify(params));
      this.apiProvider._postAPI("ManageRequests", params).subscribe(res => {
        // Manage Book Claim Requests 
        // alert('Manage Books Data ::'+ JSON.stringify(res.ManageRequestsResult));
        if(res.ManageRequestsResult.length >0){
          this.apiProvider.presentAlert('Alert!',message);
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert!','Something went wrong. Please try again!!!');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error!',err);
        loading.dismiss();
      });
    }
  }
