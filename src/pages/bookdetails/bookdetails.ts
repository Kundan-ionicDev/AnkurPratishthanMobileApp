import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, LoadingController } from 'ionic-angular';
import { ManagebooksPage } from '../managebooks/managebooks';
import { ActivityService } from '../../services/activity-service';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-bookdetails',
  templateUrl: 'bookdetails.html',
})
export class BookdetailsPage {
  // trip info
  public slideimgs: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;
  recordArray: { "Name": string; "Age": number; "Post": string; }[];
  roleId: number;
  public bookData: any;
  frmbooks: FormGroup;
  
  constructor(
    public loadingCtrl: LoadingController,
    public app:App,
    private formBuilder: FormBuilder,
    public apiProvider: RestApiProvider,
    public navCtrl: NavController, 
    public service: ActivityService,
    public navParams: NavParams) {
      this.slideimgs = { 
        "images":
        ["assets/img/slider/slider1.jpg",
        "assets/img/slider/slider1.jpg",
        "assets/img/slider/slider1.jpg",
        "assets/img/slider/slider1.jpg" 
      ]};

      navParams.get('userProfile');
      this.bookData = navParams.data.bookData;
      console.log('bookdata', JSON.stringify(this.bookData));
      this.roleId = this.apiProvider.UserRoleId;
      console.log(JSON.stringify(this.slideimgs));
      
      this.frmbooks = this.formBuilder.group({
        bookname: new FormControl(),
        bookdescription: new FormControl(''),
        bookcategory: new FormControl(''),
        bookpublisher: new FormControl(''),
        bookauthor: new FormControl(''),
        bookprice: new FormControl(''),
        booktotalstock: new FormControl(''),
        bookisavailable : new FormControl(''),
        booksold : new FormControl(''),
      });
    }
    ionViewDidLoad() {
    }

  back() {
    let nav = this.app.getRootNav(); 
    nav.setRoot(ManagebooksPage, {tabIndex: 2});
  }

  // Update Book Details
  updateBook(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...while book gets deleted'
    });
  
    loading.present();
    if (this.frmbooks.valid) {
      let params = {
        "BookName": this.frmbooks.value.bookname,
        "cmd": "2", // Command 2 for Update
        "EmailID": "kundansakpal@gmail.com",
        "Price": this.frmbooks.value.bookprice,
        "Author": this.bookData.AuthorName,
        "Stock": this.frmbooks.value.booktotalstock,
        "CategoryID": this.bookData.CategoryID,
        "LanguageID": this.bookData.LanguageID,
        "PublisherID": this.bookData.PublisherID,
        "BookID": this.bookData.BookID
      };
      this.apiProvider._postAPI("ManageBooks", params).subscribe(res => {
        // Manage Books Data
        // alert('Manage Books Data ::'+ JSON.stringify(res.ManageBooksResult));
        if(res.ManageBooksResult.length >0){
          this.apiProvider.presentAlert('Alert!','Book Updated Sucessfully');
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert!','Something went wrong. Please try again!!!');
          loading.dismiss();
        }
      }, (err) => {
        alert('Error:' + err);
        loading.dismiss();
      });
    } else {
      alert('All Fields are mandatory');
      loading.dismiss();
    }
  }
}
