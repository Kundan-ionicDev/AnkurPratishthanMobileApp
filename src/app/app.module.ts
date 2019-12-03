import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { HttpModule } from '@angular/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {ActivityService} from "../services/activity-service";
import {MyApp} from "./app.component";
import { SettingsPage} from "../pages/settings/settings";
import { CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import { HomePage} from "../pages/home/home";
import { LoginPage} from "../pages/login/login";
import { NotificationsPage} from "../pages/notifications/notifications";
import { RegisterPage} from "../pages/register/register";
import { SearchLocationPage} from "../pages/search-location/search-location";
import { ManageRequestsPage } from "../pages/manage-requests/manage-requests";
import { AddusersPage } from "../pages/addusers/addusers";
import { ManagebooksPage } from "../pages/managebooks/managebooks";
import { HelpPage } from "../pages/help/help";
import { FaqsPage } from "../pages/faqs/faqs";
import { ContactusPage } from "../pages/contactus/contactus";
import { ManageOrphanePage } from "../pages/manage-orphane/manage-orphane";
import { ZBar } from '@ionic-native/zbar/ngx';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonTextAvatar } from 'ionic-text-avatar';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrcodePage } from "../pages/qrcode/qrcode"
import { Camera } from '@ionic-native/camera';
import { BookdetailsPage } from "../pages/bookdetails/bookdetails";
import { ManageOrphanedetailsPage } from "../pages/manage-orphanedetails/manage-orphanedetails";

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    ManageOrphanePage,
    ManageRequestsPage,
    AddusersPage,
    ManagebooksPage,
    HelpPage,
    FaqsPage,
    QrcodePage,
    IonTextAvatar,
    ContactusPage,
    ManageOrphanedetailsPage,
    BookdetailsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QrcodePage,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    ManageOrphanePage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    ManageOrphanePage,
    ManageRequestsPage,
    AddusersPage,
    ManagebooksPage,
    HelpPage,
    FaqsPage,
    BookdetailsPage,
    ManageOrphanedetailsPage,
    ContactusPage
  ],
  providers: [
    StatusBar,
    ZBar,
    Camera,
    BarcodeScanner,
    SplashScreen,
    Keyboard,
    ActivityService,
    FingerprintAIO,
    RestApiProvider,
  ]
})

export class AppModule {
}
