import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the AddpublisherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpublisher',
  templateUrl: 'addpublisher.html',
})
export class AddpublisherPage {
  ispublisheradd: boolean = false;
  iconName:string= "add";
  items :any;

  constructor(
    public api: RestApiProvider,
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpublisherPage');
  }

  initialize(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.api._postAPI("GetBooksData",{"Mode":"P"}).subscribe(res => {
      // alert('GetBooksData ::'+ JSON.stringify(res));
      this.items = res.GetBooksDataResult;
    },(err) => {
        alert('Error:'+err);
    });
    loading.dismiss();
  }

  addpublisher(){
    if(this.ispublisheradd == false){
      this.ispublisheradd = true;
      this.iconName = "close";
    }else{
      this.ispublisheradd = false;
      this.iconName = "add";
    }
   
  }

}
