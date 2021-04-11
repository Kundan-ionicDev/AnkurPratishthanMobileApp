import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Platform,
  AlertController
} from 'ionic-angular';
import {
  RestApiProvider
} from '../../providers/rest-api/rest-api';
// import {
//   SocialSharing
// } from '@ionic-native/social-sharing';
import {
  InAppBrowser,InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  getdocs: any;
  title: any = "Demo";
  description: any = "Demo";
  recipeUrl: any = "demo";
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
  userLogin: any;
  isnewDoc: boolean = false;
  iconName: string = "add";

  constructor(
    public alertCtrl: AlertController,
    //private socialSharing: SocialSharing,
    public loadingCtrl: LoadingController,
    public apiProvider: RestApiProvider,
    public navCtrl: NavController,
    private iab: InAppBrowser,
    public platform: Platform,
    public navParams: NavParams) {
     this.getDocuments();
     this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AboutusPage');
  }

  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }

  openFile(item: any) {
    this.openWithSystemBrowser(item.PDFPath);
  }

  shareDocWith(item: any) {
    // this.socialSharing.shareWithOptions({
    //   message: `${'Ankur Pratishthan:'} - ${item.Title}: ${item.PDFPath}`,
    //   files: item.PDFPath
    // }).then(() => {
    //    //alert('Document Shared!');
    //    this.apiProvider.presentAlert('Alert',item.Title + "...Downcument is shared.")
    // }).catch((err) => {
    //   // alert('Oops, something went wrong:' + JSON.stringify(err));
    //   this.apiProvider.presentAlert('Error','Oops, something went wrong.Please try again.')
    // });
  }

  editDoc(){
    this.isnewDoc = true;
    this.iconName = "close";
  }

  delDoc(){
    // this.photos.splice(index, 1);
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete this document?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  addNewDoc(){
    if (this.isnewDoc == false) {
      this.isnewDoc = true;
      this.iconName = "close";
    } else {
      this.isnewDoc = false;
      this.iconName = "add";
    }
  }

  getDocuments() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.apiProvider._postAPI("GetAnkurPDF", {}).subscribe(res => {
      loading.dismiss();
      if (res.GetAnkurPDFResult.length > 0) {
        this.getdocs = res.GetAnkurPDFResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Alert', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

  loadImageFromDevice(event) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      // alert('Blob:::'+ JSON.stringify(blob))
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
      alert('blobURL' + JSON.stringify(blobURL));
      let param ={
        "fileData":blobURL
      };
      this.apiProvider._postAPI("UploadFile?fileName=kundan.pdf", param).subscribe(res => {
        loading.dismiss();
        alert('res'+ JSON.stringify(res));
      }, (err) => {
        this.apiProvider.presentAlert('Alert', err);
        loading.dismiss();
      });
    };
    reader.onerror = (error) => {
    //handle errors
    };
  };

}
