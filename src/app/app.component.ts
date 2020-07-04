import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController,App,AlertController, Events } from "ionic-angular";
import { LoginPage } from "../pages/login/login";
import { RestApiProvider } from "../providers/rest-api/rest-api";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
  roleId: number;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage
  appMenuItems: Array < MenuItem > ;
  checkdata: [{    
  }];
  constructor(
    // private fcm: FCM,
    public app: App,
    public events: Events,
    public toastCtrl: ToastController,
    //public network: Network,
    // public nav: NavController,
    public platform: Platform,
    // public statusBar: StatusBar,
    // public splashScreen: SplashScreen,
    //public keyboard: Keyboard,
    public apiProvider: RestApiProvider,
    public alertCtrl: AlertController
  ) {
    localStorage.removeItem('UserLogin');
    // this.splashScreen.hide();
    this.apiProvider.UserRoleId = 1;
    // this.initializeApp();
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        // get current active page
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        //alert('activevie' + activeView.component.name + this.apiProvider._activePage );
        if (activeView.component.name === "MainPage" || activeView.component.name === "LoginPage"
        || this.apiProvider._activePage == "pop") 
        {
          if(this.apiProvider._activePage == "pop"){
            this.nav.setRoot('MainPage');
          }else{
            if (nav.canGoBack()) {
                nav.pop();
              } else {
                const alert = this.alertCtrl.create({
                  title: 'Do you want to exit the app?',
                  message: '',
                  buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.nav.setRoot('MainPage');
                    }
                  }, {
                    text: 'OK',
                    handler: () => {
                      platform.exitApp();
                    }
                  }]
                });
                alert.present();
              }
          }
        }else {
          nav.pop();
        }
      });
      localStorage.removeItem('UserLogin');
    });
  }
}
