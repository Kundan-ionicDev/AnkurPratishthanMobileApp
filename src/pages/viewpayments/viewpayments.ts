import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { CallNumber } from '@ionic-native/call-number';
import { AcceptpayPage } from '../acceptpay/acceptpay';
import { CelebratewithusPage } from '../celebratewithus/celebratewithus';

/**
 * Generated class for the ViewpaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewpayments',
  templateUrl: 'viewpayments.html',
})
export class ViewpaymentsPage {
  donarsData: any;
  userLogin: any;
  selected: string;
  celebrateusData: any;
  mydonarRequests: any;

  constructor(
    private callNumber: CallNumber,
    public loadingCtrl: LoadingController,
    private contacts: Contacts,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder, 
    public apiProvider: RestApiProvider,
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams) {     
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      if(this.userLogin.RoleID == 1){
        this.selected= "myrequest";
      }else{
        this.selected= "donors";
      }
      this.getDonors();
  }

  ionViewDidLoad() {
    // alert('ionViewDidLoad ViewpaymentsPage');
  }

  // ionViewWillLeave() {
  //   alert("Looks like I'm about to leave :(");
  // }

  // ionViewDidEnter(){
  //   alert("ionViewDidEnter");
  // }

  // ionViewCanEnter(){
  //   alert("ionViewCanEnter yes");
  // }

  ionViewWillEnter(){
    //this.getDonors();
    this.getCelebrateReq();
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

  myDonors(){
    this.selected= "myrequest";
  }

  selectedDonors(){
    this.selected= "donors";
    this.getDonors();
  }

  getCelebrateReq(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {"EmailID": this.userLogin.EmailID,"RoleID": this.userLogin.RoleID};
    //alert('params' + JSON.stringify(params))
    this.apiProvider._postAPI("GetCelebrateRequest", params).subscribe(res => {
      // Get Donars 
      loading.dismiss();
      //alert('GetDonorsResult Data ::'+ JSON.stringify(res));
      if(res.GetCelebrateRequestResult.length >0){
        this.celebrateusData = res.GetCelebrateRequestResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }
  
  selectedCelebrate(){
    // alert('Celebrate');
    this.selected= "celebrate";
    this.getCelebrateReq();
  }

  dailCallNumber(number:any){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));  
  }

  openGooglemap(address:any,name:any){
    let label = encodeURI(name);
    window.open('geo:0,0?q=' + address + '(' + label + ')', '_system');
  }

  getDonors(){
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    let params = {"EmailID": this.userLogin.EmailID,"RoleID":this.userLogin.RoleID };
    // alert('params' + JSON.stringify(params))
    this.apiProvider._postAPI("GetDonors", params).subscribe(res => {
      // Get Donars 
     // loading.dismiss();
      //alert('GetDonorsResult Data ::'+ res.GetDonorsResult.length + '---'+JSON.stringify(res));
      if(res.GetDonorsResult.length >0){
        if(this.userLogin.RoleID == 1 && this.selected =='myrequest'){
          this.mydonarRequests = res.GetDonorsResult.filter(i=> {
            return i.CreatedBy === this.userLogin.EmailID
            && i.TemporaryFlag === 1 
            && i.AcceptFlag === 2;
          });
          //console.log('this.mydonarRequests::', JSON.stringify(this.mydonarRequests));
        }else if(this.userLogin.RoleID == 1 && this.selected == 'donors'){
          this.donarsData = res.GetDonorsResult;
        }
        else if(this.userLogin.RoleID == 2 && this.selected == 'donors'){
          this.donarsData = res.GetDonorsResult;
        }
        // alert('donarsData' + JSON.stringify(this.donarsData));
        //loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      //loading.dismiss();
    });
    //loading.dismiss();
  }


  confirmPayment(item:any){
    // this.apiProvider.presentAlert('Alert',"Request is accepted.");
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();  
      let donarparams = 
      {
        "cmd": "1",
        "DonorID": item.DonorID,
        "EmailID": item.EmailID,
        "Contact": item.ContactNo,
        "AddedBy":this.userLogin.EmailID,
        "Reason":""
      };
      // alert('Accept Req Json'+ JSON.stringify(donarparams));
      this.apiProvider._postAPI("DonationApproval", donarparams).subscribe(res => {
        // Added Donar 
        // alert('API Data ::'+ JSON.stringify(res));
        if(res.DonationApprovalResult.length >0){
          this.apiProvider.presentAlert('Alert',res.DonationApprovalResult);
          this.getDonors();
          this.getCelebrateReq();
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'something went wrong, please try again.');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
      loading.dismiss();
  }

  async deletereq(item:any){
    const alert = await this.alertCtrl.create({
      title: 'Do you really want to delete ?',
      message: '',
      buttons: [{
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
          let params = 
          {
              "Prefix":item.Prefix,
              "FullName": item.FullName,
              "Inthenameof": item.Inthenameof,
              "EmailID": item.EmailID,
              "ContactNo": item.ContactNo,
              "DOB": item.DOB,
              "Address": item.Address,
              "Amount": item.Amount,
              "PaymentMode": item.PaymentMode,
              "AdminEmailID": this.userLogin.EmailID,
              "DonationTowards": item.DonationTowards,
              "PAN": item.PAN,
              "Amount1": item.Amountinwords,
              "cmd": "3",
              "DonorID": item.DonorID,
              "Description": item.Description,
              "PointOfContact":item.PointOfContact
          };
          // alert('Delete Donors request' + JSON.stringify(params));
          this.apiProvider._postAPI("ManageDonor", params).subscribe(res => {
            // Get Donars 
            loading.dismiss();
            // alert('ManageDonorResult Data ::'+ JSON.stringify(res.ManageDonorResult));
            if(res.ManageDonorResult.length >0){
              // this.donarsData = res.ManageDonorResult;
              this.apiProvider.presentAlert('Alert','Donor request is deleted sucessfully.');
              this.getDonors();
              // alert('donarsData' + JSON.stringify(this.donarsData));
              loading.dismiss();
            }else{
              this.apiProvider.presentAlert('Alert','Error while deleting record.')
            }
          }, (err) => {
            this.apiProvider.presentAlert('Error', err);
            loading.dismiss();
          });
          loading.dismiss();
        }
      }]
    });
    await alert.present();
  }

  editreq(itemData:any){
    // this.navCtrl.push(AcceptpayPage);
    this.navCtrl.push(AcceptpayPage, {
      item: itemData
    });
  }

  rejectpayment(item:any){
    let alert = this.alertCtrl.create({
      title: 'Please provide valid message for Reject',
      enableBackdropDismiss: true,
      inputs: [
        {
          name: 'rejectreason',
          placeholder: 'Reason for Reject'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
           this.rejectRequest(item, data);
          }
        }
      ]
    });
    alert.present();
  }

  registerDonor(item:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let donarparams = 
    {
      "Prefix":item.Prefix,
      "FullName": item.FullName,
      "Inthenameof": item.Inthenameof,
      "EmailID": item.EmailID,
      "ContactNo": item.ContactNo,
      "DOB": item.DOB,
      "Address": item.Address,
      "Amount": item.Amount,
      "PaymentMode": item.PaymentMode,
      "AdminEmailID": this.userLogin.EmailID,
      "DonationTowards": item.DonationTowards,
      "PAN":item.PAN,
      "Amount1":item.Amountinwords,
      "Description":item.Description,
      "cmd":2, // 1 == Insert, 2 == Update and 3 == Delete
      "DonorID": item.DonorID,
      "Tempflag": 0, // 1 == Temporary Save and 0 == Permanent
      "PointOfContact":item.PointOfContact
    };

    // alert('Add Donar Params : :' + JSON.stringify(donarparams));
    this.apiProvider._postAPI('ManageDonor', donarparams).subscribe(res => {
      // Added Donar 
      loading.dismiss();
      // alert('API Data ::'+ JSON.stringify(res));
      if(res.ManageDonorResult.length >0){
        this.apiProvider.presentAlert('Alert','Donor Request Submitted to Admin.');
        this.getDonors();
        loading.dismiss();
      }else{
        this.apiProvider.presentAlert('Alert', 'Error while Submitting Donar request.');
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
  }

  rejectRequest(item:any,data:any) {
    //alert('Reject Request:' + JSON.stringify(data));
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();  
      let donarparams = 
      {
        "cmd": "2",
        "DonorID": item.DonorID,
        "EmailID": item.EmailID,
        "Contact": item.ContactNo,
        "AddedBy":this.userLogin.EmailID,
        "Reason":data.rejectreason
      };

      //alert('Reject Req Json'+ JSON.stringify(donarparams));
      this.apiProvider._postAPI("DonationApproval", donarparams).subscribe(res => {
        // alert('API Data ::'+ JSON.stringify(res));
        if(res.DonationApprovalResult.length >0){
          this.apiProvider.presentAlert('Alert',res.DonationApprovalResult);
          this.getDonors();
          this.getCelebrateReq();
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'Something went wrong, please try again.');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
      loading.dismiss();
  }

  editCeleReq(itemData:any){
    this.navCtrl.push(CelebratewithusPage, {
      item: itemData
    });
  }

  deleteCelebrateReq(item:any){
    // alert('item' + JSON.stringify(item));
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();  
      let donarparams = 
      {
        "cmd": "3",
        "FirstName": item.FirstName,
        "LastName": item.LastName,
        "EmailID": item.Email,
        "Contact": item.Contact,
        "Date": item.DateOfEvent,
        "VolEmailID": this.userLogin.EmailID,
        "AreaID": item.AreaID,
        "OccassionID": item.OccassionID,
        "ID": item.ID
      };

      // alert('Update Celebrate Request Params : :' + JSON.stringify(donarparams));
      this.apiProvider._postAPI("ManageCelebrateRequest", donarparams).subscribe(res => {
        // Added Donar 
        // alert('API Data ::'+ JSON.stringify(res));
        if(res.ManageCelebrateRequestResult.length >0){
          this.apiProvider.presentAlert('Alert', 'Celebrate Request Deleted sucessfully.');
          this.getCelebrateReq();
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'Error while deleting celebrate request');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
      loading.dismiss();
  }
}
