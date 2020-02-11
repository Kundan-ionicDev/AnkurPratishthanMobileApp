import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public nav: NavController, 
    public api: RestApiProvider,
    public forgotCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public apiProvider: RestApiProvider,
    private faio: FingerprintAIO) {
      this.menu.swipeEnable(false);
      this.user = this.formBuilder.group({
        emailaddress: new FormControl('cluster@ap.com', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: ['123',Validators.required]
      });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  async login(userdata) {
    console.log(this.user.value);
    if(this.user.valid){
      localStorage.removeItem('UserRoleId');
      // this.apiProvider.UserRoleId = 1;
      // let params = {
      //     "EmailID":"kundansakpal@gmail.com",
      //     "Password":"password",
      //     "deviceinfo":"Android9",
      //     "isnewapp":"111"
      // };

      let params = {"username":"SP005","password":"123"};

      this.api._postAPI("user/login",params).subscribe(res => {
        // User exists
        alert('res'+ JSON.stringify(res));
      },(err) => {
          alert('Error:'+err);
      });
      
      if(this.user.value.emailaddress =="admin@ap.com" && this.user.value.password == "123"){
        localStorage.removeItem('UserRoleId');
        this.apiProvider.UserRoleId = 0;
      }else if(this.user.value.emailaddress =="cluster@ap.com" && this.user.value.password == "123"){
        localStorage.removeItem('UserRoleId');
        this.apiProvider.UserRoleId = 1;
      } else if(this.user.value.emailaddress =="lib@ap.com" && this.user.value.password == "123"){
        localStorage.removeItem('UserRoleId');
        this.apiProvider.UserRoleId = 2;
      }
      // localStorage.removeItem('UserRoleId');
      // this.apiProvider.UserRoleId = 0;
      // Check if Fingerprint or Face  is available
      this.faio.isAvailable()
      .then(result => {
      if(result === "finger" || result === "face"){
        // Fingerprint or Face Auth is available
        this.faio.show({
          clientId: 'AnkurBioAuthApp',
          clientSecret: 'ankurAuthDemo', //Only necessary for Android
          disableBackup: true, //Only for Android(optional)
          localizedFallbackTitle: 'Use Pin', //Only for iOS
          localizedReason: 'Please Authenticate' //Only for iOS
      })
      .then((result: any) => {
        if(result == "biometric_success"){
          // Fingerprint/Face was successfully verified
          // Go to dashboard
          // User Role : 
          /// 0 - Admin
          /// 1 - Librarian
          /// 2 - Cluster
          /// 3 - Member
          // localStorage.setItem('UserRoleId','0');
          // this.apiProvider.UserRoleId = 0;
          // this.nav.setRoot(HomePage);
        }
        else {
          // Fingerprint/Face was not successfully verified
          alert(result);
        }
      })
      .catch((error: any) => {
        //Fingerprint/Face was not successfully verified
        alert(error);
      });
      }
      else {
          //Fingerprint or Face Auth is not available
          alert('Fingerprint/Face Auth is not available   on this device!');
        }
      });
      this.nav.setRoot(HomePage);
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
          }
        }
      ]
    });
    forgot.present();
  }

}
