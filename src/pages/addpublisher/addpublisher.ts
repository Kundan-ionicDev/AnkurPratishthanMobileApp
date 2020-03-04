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
  publisherName: any;

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
    this.items = JSON.parse(localStorage.getItem('BooksData'));
    loading.dismiss();
  }

  getBooksData(){
    this.api._postAPI("GetBooksData", '').subscribe(res => {
      let obj = res.GetBooksDataResult;
      localStorage.removeItem('BooksData');
      localStorage.setItem('BooksData',JSON.stringify(obj))
      this.items = JSON.parse(localStorage.getItem('BooksData'));
    }, (err) => {
      alert('Error:' + err);
    });
  }

  save(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.publisherName.length >0){
      let params = {
        "PublisherName":  this.publisherName,
        "cmd": "1",
        "Email": "testign@testing.com",
      };
      this.api._postAPI("ManagePublishers",params).subscribe(res => {
        // alert('ManagePublishersResult ::'+ JSON.stringify(res.ManagePublishersResult));
        if(res.ManagePublishersResult.length >0){
          this.api.presentAlert('Alert!','New Publisher added sucessfully.');
          this.publisherName = '';
          this.getBooksData();
          loading.dismiss();
        }else{
          this.api.presentAlert('Error',res.ManagePublishersResult.Message)
          loading.dismiss();
        }
      },(err) => {
          alert('Error:'+err);
      });
    }else{
      this.api.presentAlert('Error','Please provide Category name')
    }
    
  }

  deletePublisher(publisherId:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params =  {
        "PublisherID":publisherId,
        "PublisherName": "",
        "cmd": "3",
        "Email": "testign@testing.com"
    }
    this.api._postAPI("ManagePublishers",params).subscribe(res => {
      // alert('ManagePublishersResult ::'+ JSON.stringify(res.ManagePublishersResult));
      if(res.ManagePublishersResult.length >0){
        this.api.presentAlert('Alert!','Publisher Deleted sucessfully.');
        this.publisherName ='';
        this.getBooksData();
        loading.dismiss();
      }else{
        this.api.presentAlert('Error',res.ManagePublishersResult.Message)
        loading.dismiss();
      }
    },(err) => {
        alert('Error:'+err);
    });
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
