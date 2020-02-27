import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the AddlanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addlanguage',
  templateUrl: 'addlanguage.html',
})
export class AddlanguagePage {
  islanguageadd: boolean = false;
  items: any;
  iconName: string="add";
  languageName: any;

  constructor(
    public api: RestApiProvider,
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.initialize();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddlanguagePage');
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
    if(this.languageName.length >0){
      let params = {
        "LanguageName":  this.languageName,
        "cmd": "1",
        "Email": "testign@testing.com",
      };
      this.api._postAPI("ManageLanguages",params).subscribe(res => {
        // alert('ManageLanguagesResult ::'+ JSON.stringify(res.ManageLanguagesResult));
        if(res.ManageLanguagesResult.length >0){
          this.api.presentAlert('Alert!','New Language added sucessfully.');
          this.getBooksData();
          loading.dismiss();
        }else{
          this.api.presentAlert('Error',res.ManageLanguagesResult.Message)
          loading.dismiss();
        }
      },(err) => {
          alert('Error:'+err);
      });
    }else{
      this.api.presentAlert('Error','Please provide Category name')
    }
    
  }

  deleteLanguage(LangId:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params =  {
        "LanguageID":LangId,
        "LanguageName": "",
        "cmd": "2",
        "Email": "testign@testing.com"
    }
    this.api._postAPI("ManageLanguages",params).subscribe(res => {
      // alert('ManageLanguagesResult ::'+ JSON.stringify(res.ManageLanguagesResult));
      if(res.ManageLanguagesResult.length >0){
        this.api.presentAlert('Alert!','Language Deleted sucessfully.');
        this.getBooksData();
        loading.dismiss();
      }else{
        this.api.presentAlert('Error',res.ManageLanguagesResult.Message)
        loading.dismiss();
      }
    },(err) => {
        alert('Error:'+err);
    });
  }


  addlanguage(){
    if(this.islanguageadd == false){
      this.islanguageadd = true;
      this.iconName = "close";
    }else{
      this.islanguageadd = false;
      this.iconName = "add";
    }
  }

}
