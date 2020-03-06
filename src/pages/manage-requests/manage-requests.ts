import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ManageRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-requests',
  templateUrl: 'manage-requests.html',
})
export class ManageRequestsPage {
  items: any;
  message: string;
  requestsData: any;

  constructor(
    public loadingCtrl: LoadingController,
    public apiProvider: RestApiProvider,
    public navCtrl: NavController, 
    public toastController: ToastController,
    public navParams: NavParams) {
      // this.items = [
      //   { requested:'Prenav', requestedFor:"Kundan", requestedDate:"2019-11-01", bookname:"Harry Potter", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
      //   { requested:'Udhav', requestedFor:"Ketan", requestedDate:"2019-11-02", bookname:"MIchael", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
      //   { requested:'Mahesh', requestedFor:"Anil", requestedDate:"2019-10-01", bookname:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
      //   { requested:'NGO', requestedFor:"Puesh", requestedDate:"2019-11-27", bookname:"SQuare Panda", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" },
      //   { requested:'Prenav', requestedFor:"Kundan", requestedDate:"2019-11-01", bookname:"Harry Potter", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
      //   { requested:'Udhav', requestedFor:"Ketan", requestedDate:"2019-11-02", bookname:"MIchael", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
      //   { requested:'Mahesh', requestedFor:"Anil", requestedDate:"2019-10-01", bookname:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
      //   { requested:'NGO', requestedFor:"Puesh", requestedDate:"2019-11-27", bookname:"SQuare Panda", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" },
      //   { requested:'Prenav', requestedFor:"Kundan", requestedDate:"2019-11-01", bookname:"Harry Potter", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
      //   { requested:'Udhav', requestedFor:"Ketan", requestedDate:"2019-11-02", bookname:"MIchael", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
      //   { requested:'Mahesh', requestedFor:"Anil", requestedDate:"2019-10-01", bookname:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
      //   { requested:'NGO', requestedFor:"Puesh", requestedDate:"2019-11-27", bookname:"SQuare Panda", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" }
      // ];
      this.initialize();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ManageRequestsPage');
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
