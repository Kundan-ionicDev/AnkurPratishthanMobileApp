import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
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

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
    roleId:number;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public apiProvider: RestApiProvider
  ) {
    this.apiProvider.UserRoleId = 9;
    this.initializeApp();
    this.appMenuItems = [
      // Menu for Admin
      { title: 'Home', component: HomePage, icon: 'home',roleId:0 },
      { title: 'Book Management', component: ManagebooksPage, icon: 'ios-book',roleId:0 },
      { title: 'Cluster Management', component: AddusersPage, icon: 'ios-add-circle-outline',roleId:0 },
      { title: 'Librarian Management', component: AddusersPage, icon: 'md-person',roleId:0 },
      { title: 'Member Management', component: AddusersPage, icon: 'ios-people',roleId:0 },
      { title: 'Approvals', component: ManageRequestsPage, icon: 'git-pull-request',roleId:0 },
      { title: 'Reports', component: ManageOrphanePage, icon: 'body',roleId:0 },   
      { title: 'Help', component: HelpPage, icon: 'md-help-circle',roleId:0 },
      { title: 'QR Code', component: QrcodePage, icon: 'md-help',roleId:0 },
      { title: 'Contact us', component: ContactusPage, icon: 'md-call',roleId:0 },

      // Menu for Librarian 
      { title: 'Book Circulation', component: ContactusPage, icon: 'md-call',roleId:1 },
      { title: 'Member Management', component: ContactusPage, icon: 'md-call',roleId:1 },
      { title: 'View', component: ContactusPage, icon: 'md-call',roleId:1 },

      // Menu for Cluster
      { title: 'Book Circulation', component: ContactusPage, icon: 'md-call',roleId:2 },
      { title: 'Member Management', component: ContactusPage, icon: 'md-call',roleId:2 },
      { title: 'View', component: ContactusPage, icon: 'md-call',roleId:2 }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      this.splashScreen.show();
      this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      // this.keyboard.disableScroll(true);
    });
  }

  openPage(page,title) {
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
