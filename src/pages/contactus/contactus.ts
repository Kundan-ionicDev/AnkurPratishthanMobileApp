import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import {
  RestApiProvider
} from '../../providers/rest-api/rest-api';
import { ThrowStmt } from '@angular/compiler';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  userLogin: any;
  fullname: any;
  phonenumber: any;
  emailid: any;
  subjectvalue: any;
  comments: any;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };
  
  constructor(
    private callNumber: CallNumber,
    public alertCtrl: AlertController,
    public apiProvider: RestApiProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    private iab: InAppBrowser,
    public navParams: NavParams) {
    this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
    this.fullname = this.userLogin.FullName;
    this.phonenumber = this.userLogin.ContactNo;
    this.emailid = this.userLogin.EmailID;
    this.apiProvider._activePage ="pop";
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ContactusPage');
  }

  // login and go to home page
  async submitquey() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // alert('Comments:' + this.comments + "Subject:" + this.subjectvalue);
    if(this.comments != undefined && this.subjectvalue !=undefined){
      let params ={
        "EmailID": this.userLogin.EmailID,
        "Contact": this.userLogin.ContactNo,
        "FullName": this.userLogin.FullName,
        "Query": this.comments,
        "Subject": this.subjectvalue
       }
  
      this.apiProvider._postAPI("SubmitQuery", params).subscribe(res => {
        loading.dismiss();
        // alert('Response' + JSON.stringify(res.SubmitQueryResult));
        if(res.SubmitQueryResult.length >0){
          this.apiProvider.presentAlert('Alert','Your query is submitted sucessfully. Please keep Ticket Id for further query &nbsp;&nbsp; #' + res.SubmitQueryResult[0].TicketID)
        }else{
          this.apiProvider.presentAlert('Alert','Please try again or contact system administrator');
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
    }else{
      loading.present();
      this.apiProvider.presentAlert('Alert', 'Comments and Subject is mandatory.');
    }
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

  sharewithemail() {
   // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      // Share via email
      this.socialSharing.shareViaEmail('Body', 'Ankur Pratishthan :Donation Management App', ['work@credencetechnology.com']).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }

  openFile() {
    this.openWithSystemBrowser("http://credencetechnology.in");
  }


}
