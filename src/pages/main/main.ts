import { Component, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController, ViewController, Slides, Platform, Events } from 'ionic-angular';
import { AcceptpayPage } from '../acceptpay/acceptpay';
import { ManagevoluntersPage } from '../managevolunters/managevolunters';
import { ViewpaymentsPage } from '../viewpayments/viewpayments';
import { ViewbirthdaysPage } from '../viewbirthdays/viewbirthdays';
import { LoginPage } from '../login/login';
import { ContactusPage } from '../contactus/contactus';
import { HelpPage } from '../help/help';
import { CelebratewithusPage } from '../celebratewithus/celebratewithus';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { ProfilePage } from '../profile/profile';
import { DonarDetailComponent } from '../../components/donar-detail/donar-detail';
import { NotificationsPage } from '../notifications/notifications';
import { MydonorsPage } from '../mydonors/mydonors';
import { AboutusPage } from '../aboutus/aboutus';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { RegisterPage } from '../register/register';
import { ReportsPage } from '../reports/reports';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  // slides : any;
  @ViewChild('slides') slides: Slides;

  userLogin: any;
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
  subscription: any;
  Profileimg:any;
  userName: any;
  constructor(
    public platform: Platform,
    private iab: InAppBrowser,
    public popoverCtrl: PopoverController,
    public apiProvider: RestApiProvider,
    public loadingCtrl: LoadingController,
    public alertcntrl: AlertController,
    public navCtrl: NavController, 
    public events: Events,
    private socialSharing: SocialSharing,
    public navParams: NavParams,
    public changeDetector: ChangeDetectorRef) {
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      this.Profileimg = this.userLogin.Img;
      this.userName = this.userLogin.FullName;
      //this.userLogin = this.apiProvider.userLoggedInData;
      this.events.subscribe('loginData', (user) => {  
       // alert('JSON'+ JSON.stringify(user));
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.Profileimg = user.Img;
        this.userName = user.FullName;
        // this.userLogin.FullName = user.FullName;
        this.changeDetector.detectChanges();
        this.userLogin = {
          "EmailID":user.EmailID,
          "FullName":this.userLogin.FullName,
          "FirstName":user.FirstName,
          "LastName": user.LastName,
          "RoleID":user.RoleID,
          "Address":user.Address,
          "ContactNo":user.ContactNo,
          "DOB":user.DOB,
          "LoginID":user.LoginID,
          "Img": user.Img
        };
        // alert('Profileimg ' + this.Profileimg);
      });
      this.getSlides();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MainPage');
  }

  
  presentNotifications(myEvent) {
    // let myEmitter = new EventEmitter<any>();
		// myEmitter.subscribe(
		// 	v=> console.log( `my emitter fired and returned a value of ${v}`)
		// );
    // console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
       popover.present({
       ev: myEvent
    });
  }


  navigate(id: any){
    if(id == 0){
      this.navCtrl.push(AcceptpayPage);
    }else if(id == 1){
      this.navCtrl.push(CelebratewithusPage);
    }else if(id == 2){
      this.navCtrl.push(ViewpaymentsPage);
    }else if(id == 3){
      this.navCtrl.push(MydonorsPage);
    }else if(id == 4){
      this.navCtrl.push(ManagevoluntersPage);
    }else if(id == 5){
      this.navCtrl.push(ViewbirthdaysPage);
    }else if(id == 6){
      this.navCtrl.push(ContactusPage);
    }else if(id == 7){
      this.navCtrl.push(AboutusPage);
    }else if(id == 8){
      this.navCtrl.push(ReportsPage);
    }
  }

  needHelp(){
    this.navCtrl.push(HelpPage);
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }

  
  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }

  socialsite(id:any){
    if(id == '0'){
      this.openWithSystemBrowser("https://www.instagram.com/ngoankur/");      
    }else if(id == '1'){
      this.openWithSystemBrowser("https://www.facebook.com/ngoankur/");
    }else if(id == '2'){
      this.openWithSystemBrowser("https://www.youtube.com/user/ngoankur");
    }else if(id == '3'){
       // Check if sharing via email is supported
      this.socialSharing.canShareViaEmail().then(() => {
        // Sharing via email is possible
        // Share via email
        this.socialSharing.shareViaEmail('', 'Ankur Pratishthan :Donation Management App', ['ngoankur@gmail.com']).then(() => {
          // Success!
        }).catch(() => {
          // Error!
        });
      }).catch(() => {
        // Sharing via email is not possible
      });
    }else if(id == '4'){
      this.openWithSystemBrowser("http://www.ankurpratishthan.org/");
    }else if(id == '5'){
      this.openWithSystemBrowser("https://twitter.com/ngoankur");
    }
  }

  getSlides(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    // loading.present();
    //alert('params' + JSON.stringify(params))
    this.apiProvider._postAPI("GetSlides", {}).subscribe(res => {
      // Get Donars 
      loading.dismiss();
      // alert('GetSlidesResult Data ::'+ JSON.stringify(res));
      if(res.GetSlidesResult.length >0){
        this.slides = res.GetSlidesResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        loading.dismiss();
      }else{
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Alert',err);
      loading.dismiss();
    });
    loading.dismiss();
  }

 



}
