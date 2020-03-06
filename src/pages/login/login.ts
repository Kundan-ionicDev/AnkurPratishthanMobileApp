import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, LoadingController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Device } from '@ionic-native/device';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: FormGroup;
  loginData: any;
  
  constructor(
    private formBuilder: FormBuilder,
    public nav: NavController, 
    public api: RestApiProvider,
    public forgotCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public apiProvider: RestApiProvider,
    public loadingCtrl: LoadingController,
    private device: Device,
    private faio: FingerprintAIO) {
      this.menu.swipeEnable(false);
      this.user = this.formBuilder.group({
        emailaddress: new FormControl('kundansakpal@gmail.com', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: ['kundan123',Validators.required]
      });

      // console.log('Device UUID is: ' + this.device.uuid);
      // console.log('Device model is: ' + this.device.model);
      // console.log('Device platform is: ' + this.device.platform);
      // console.log('Device version is: ' + this.device.version);
      // console.log('Device manufacturer is: ' + this.device.manufacturer);
      
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }



  // login and go to home page
  async login(userdata) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    // console.log(this.user.value);
    if(this.user.valid){
      localStorage.removeItem('UserRoleId');
      // this.apiProvider.UserRoleId = 2;
      let params = {
        "EmailID": this.user.value.emailaddress,
        "Password": this.user.value.password,
        "deviceinfo": 'Model:'+this.device.model +'Manufacturer:'+this.device.manufacturer +'version:' +this.device.version,
        "platform": this.device.platform,
        "FCMID": localStorage.getItem('FCMToken'),
        "IMEI": ""
      };
      // alert('params' + JSON.stringify(params));
      // let params = {"username":"SP005","password":"123"};
      this.api._postAPI("UserLogin",params).subscribe(res => {
        // User exists
        // alert('Login Data ::'+ JSON.stringify(res));
        if(res.length >0){
          if(res.UserLoginResult.Message =="Success"){
            localStorage.removeItem('UserRoleId');
            this.apiProvider.UserRoleId = res.UserLoginResult.RoleID;
            this.loginData = {
              "EmailId":res.UserLoginResult.EmailId,
              "FullName":res.UserLoginResult.FullName,
              "RoleID":res.UserLoginResult.RoleID
            };
            localStorage.setItem('UserLogin',JSON.stringify(this.loginData));
            // let checkdata = JSON.parse(localStorage.getItem('UserLogin'));
            // alert('checkData' + JSON.stringify(checkdata));
            this.nav.setRoot(HomePage);
            loading.dismiss();
          }else{
            loading.dismiss();
            this.apiProvider.presentAlert('Error',res.UserLoginResult.Message);
          }
        }else{
          loading.dismiss();
          this.apiProvider.presentAlert('Error','Please try again');
        }
      },(err) => {
        loading.dismiss();
        this.apiProvider.presentAlert('Error',err);
      });
     
      // if(this.user.value.emailaddress =="admin@ap.com" && this.user.value.password == "123"){
      //   localStorage.removeItem('UserRoleId');
      //   this.apiProvider.UserRoleId = 0;
      // }else if(this.user.value.emailaddress =="cluster@ap.com" && this.user.value.password == "123"){
      //   localStorage.removeItem('UserRoleId');
      //   this.apiProvider.UserRoleId = 1;
      // } else if(this.user.value.emailaddress =="lib@ap.com" && this.user.value.password == "123"){
      //   localStorage.removeItem('UserRoleId');
      //   this.apiProvider.UserRoleId = 2;
      // }
      
      // localStorage.removeItem('UserRoleId');
      // this.apiProvider.UserRoleId = 0;
      // Check if Fingerprint or Face  is available
      // this.faio.isAvailable()
      // .then(result => {
      // if(result === "finger" || result === "face"){
      //   // Fingerprint or Face Auth is available
      //   this.faio.show({
      //     clientId: 'AnkurBioAuthApp',
      //     clientSecret: 'ankurAuthDemo', //Only necessary for Android
      //     disableBackup: true, //Only for Android(optional)
      //     localizedFallbackTitle: 'Use Pin', //Only for iOS
      //     localizedReason: 'Please Authenticate' //Only for iOS
      // })
      // .then((result: any) => {
      //   if(result == "biometric_success"){
      //   }
      //   else {
      //     alert(result);
      //   }
      // })
      // .catch((error: any) => {
      //   alert(error);
      // });
      // }
      // else {
      //     alert('Fingerprint/Face Auth is not available   on this device!');
      //   }
      // });
      
    }else{
      alert('Invalid');
    }
  }
  
    
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      enableBackdropDismiss:false,
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Password is reset sucessfully. Please check your email.',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
            this.register();
          }
          
        }
      ]
    });
    forgot.present();
  }

}
