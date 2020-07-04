import { NgModule} from "@angular/core";
import { IonicApp, IonicModule, IonicPageModule} from "ionic-angular";
import { BrowserModule} from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { IonicStorageModule} from '@ionic/storage';
import { HttpModule } from '@angular/http';
//import { StatusBar} from '@ionic-native/status-bar/ngx';
import { SplashScreen} from '@ionic-native/splash-screen';
import { Keyboard} from '@ionic-native/keyboard';
import { MyApp} from "./app.component";
import { LoginPage} from "../pages/login/login";
import { NotificationsPage} from "../pages/notifications/notifications";
import { RegisterPage} from "../pages/register/register";
import { HelpPage } from "../pages/help/help";
import { ContactusPage } from "../pages/contactus/contactus";
import { ZBar } from '@ionic-native/zbar/ngx';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonTextAvatar } from 'ionic-text-avatar';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { Camera } from '@ionic-native/camera';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network/ngx';
import { NgOtpInputModule } from  'ng-otp-input';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
import { DatePicker } from '@ionic-native/date-picker';
import { MainPage } from "../pages/main/main";
import { AcceptpayPage } from "../pages/acceptpay/acceptpay";
import { ViewpaymentsPage } from "../pages/viewpayments/viewpayments";
import { ManagevoluntersPage } from "../pages/managevolunters/managevolunters";
import { ViewbirthdaysPage } from "../pages/viewbirthdays/viewbirthdays";
import { CelebratewithusPage } from "../pages/celebratewithus/celebratewithus";
import { ProfilePage } from "../pages/profile/profile";
import { ViewDonorsreceiptPage } from "../pages/view-donorsreceipt/view-donorsreceipt";
import { DonarDetailComponent } from "../components/donar-detail/donar-detail";
import { MydonorsPage } from "../pages/mydonors/mydonors";
import { AboutusPage } from "../pages/aboutus/aboutus";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    HelpPage,
    IonTextAvatar,
    ContactusPage,
    MainPage,
    AcceptpayPage,
    ManagevoluntersPage,
    ViewpaymentsPage,
    ViewbirthdaysPage,
    CelebratewithusPage,
    ProfilePage,
    ViewDonorsreceiptPage,
    DonarDetailComponent,
    MydonorsPage,
    AboutusPage
  ],
  imports: [
    AutoCompleteModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: true,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
      
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    NgOtpInputModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    HelpPage,
    ContactusPage,
    MainPage,
    AcceptpayPage,
    ManagevoluntersPage,
    ViewpaymentsPage,
    ViewbirthdaysPage,
    CelebratewithusPage,
    ProfilePage,
    ViewDonorsreceiptPage,
    MydonorsPage,
    AboutusPage
   // DonarDetailComponent
  ],
  providers: [
    // StatusBar,
    ZBar,
    Camera,
    SplashScreen,
    Keyboard,
    FingerprintAIO,
    RestApiProvider,
    FCM,
    Device,
    Network,
    CallNumber,
    Contacts,
    DatePicker,
    SocialSharing,
    InAppBrowser
  ]
})

export class AppModule {
}
