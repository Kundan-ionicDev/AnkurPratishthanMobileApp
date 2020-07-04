import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController,App,AlertController, Events } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { ManageOrphanePage } from "../pages/manage-orphane/manage-orphane";
import { ManageRequestsPage } from "../pages/manage-requests/manage-requests";
import { AddusersPage } from "../pages/addusers/addusers";
import { ManagebooksPage } from "../pages/managebooks/managebooks";
import { HelpPage } from "../pages/help/help";
import { ContactusPage } from "../pages/contactus/contactus";
import { QrcodePage } from "../pages/qrcode/qrcode";
import { RestApiProvider } from "../providers/rest-api/rest-api";
import { FCM } from '@ionic-native/fcm';
// import { NetworkProvider } from "../providers/network/network";
// import { Network } from "@ionic-native/network/ngx";


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

  rootPage: any = LoginPage;

  appMenuItems: Array < MenuItem > ;
  checkdata: [{
    
  }];

  constructor(
    private fcm: FCM,
    public app: App,
    public events: Events,
    // public network: Network,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public apiProvider: RestApiProvider,
    public alertCtrl: AlertController,
   // public networkProvider: NetworkProvider
  ) {
    this.apiProvider.UserRoleId = 1;
    this.initializeApp();
    this.appMenuItems = [
      // Menu for Admin
      { title: 'Home', component: HomePage, icon: 'home', roleId: 1 },
      { title: 'Book Management', component: ManagebooksPage, icon: 'book', roleId: 1 },
      { title: 'Cluster Management', component: AddusersPage, icon: 'ios-add-circle-outline', roleId: 1 },
      { title: 'Librarian Management', component: AddusersPage, icon: 'md-person', roleId: 1 },
      { title: 'Member Management', component: AddusersPage, icon: 'ios-people', roleId: 1 },
      { title: 'Approvals', component: ManageRequestsPage, icon: 'md-git-pull-request', roleId: 1 },
      // { title: 'Reports', component: ManageOrphanePage, icon: 'body', roleId: 1 },
      // { title: 'Help', component: HelpPage, icon: 'md-help-circle', roleId: 1 },
      { title: 'Print QR Code', component: QrcodePage, icon: 'qr-scanner', roleId: 1 },
      { title: 'Contact us', component: ContactusPage, icon: 'call', roleId: 1 },

      // Menu for Librarian 
      { title: 'Home',component: HomePage, icon: 'home',roleId: 2 },
      { title: 'Book Circulation',component: ManagebooksPage, icon: 'book', roleId: 2 },
      { title: 'Member Management', component: AddusersPage, icon: 'people',roleId: 2 },
      { title: 'Contact us', component: ContactusPage, icon: 'call', roleId: 2 },

      // Menu for Cluster
      { title: 'Home', component: HomePage, icon: 'home', roleId: 3 },
      { title: 'Book Circulation', component: ManagebooksPage, icon: 'book-outline', roleId: 3 },
      { title: 'Member Management', component: AddusersPage, icon: 'people', roleId: 3 },
      { title: 'Contact us', component: ContactusPage, icon: 'call', roleId: 3 },

      // Menu for members
      { title: 'Home', component: HomePage, icon: 'home', roleId: 4 },
      { title: 'Books', component: ManagebooksPage, icon: 'book-outline', roleId: 4 },
      { title: 'Request', component: ContactusPage, icon: 'git-pull-request', roleId: 4 },
      { title: 'Contact us', component: ContactusPage, icon: 'call', roleId: 4 }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.networkProvider.initializeNetworkEvents();

	    //    		// Offline event
			//     this.events.subscribe('network:offline', () => {
			//         alert('network:offline ==> '+this.network.type);    
			//     });

			//     // Online event
			//     this.events.subscribe('network:online', () => {
			//         alert('network:online ==> '+this.network.type);        
      //     });
          
      // Okay, so the platform is ready and our plugins are available.
      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;
      // alert('checkdata' + JSON.stringify(this.checkdata));
      if (localStorage.hasOwnProperty("UserLogin")) {
        this.checkdata = JSON.parse(localStorage.getItem('UserLogin'));
      }else{
        // alert('No data available');
      }
     
      
      this.platform.registerBackButtonAction(() => {
        // get current active page
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        // alert('view.component.name' + activeView.component.name);
        if (activeView.component.name === "HomePage" || activeView.component.name ==="LoginPage") {
          
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
                  this.nav.setRoot('HomePage');
                }
              }, {
                text: 'OK',
                handler: () => {
                  this.logout();
                  this.platform.exitApp();
                }
              }]
            });
            alert.present();
          }
        }
      });
      //*** Control Splash Screen
      this.splashScreen.show();
      this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      // this.keyboard.disableScroll(true);

      this.fcm.subscribeToTopic('marketing');


      this.fcm.getToken().then(token => {
        // alert('FCM Token:'+ token);
        localStorage.setItem('FCMToken', token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          // console.log("Received in background");
          // alert('data :' + JSON.stringify(data))
        } else {
          // console.log("Received in foreground");
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        // console.log(token);
      });

      // this.fcm.unsubscribeFromTopic('marketing');
    });
  }

  openPage(page, title) {
    // alert('page'+ title);
    this.apiProvider._selectedtitle = title;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
