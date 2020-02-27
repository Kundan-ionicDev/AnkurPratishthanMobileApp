import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


/**
 * Generated class for the AddcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcategory',
  templateUrl: 'addcategory.html',
})
export class AddcategoryPage {
  // items = [
  //   { title:'Arts & Music', subtitle:"Dadar",suffix:"A", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
  //   { title:'Biographies' , subtitle:"Andheri",suffix:"B", address:"", icon:"../../assets/img/trip/thumb/trip_2.jpg" },
  //   { title:'Business', subtitle:"Bandra",suffix:"B", address:"", icon:"../../assets/img/trip/thumb/trip_3.jpg" } ,
  //   { title:'Kids' , subtitle:"Sion",suffix:"K", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
  //   { title:'Comics' , subtitle:"", suffix:"C", address:"Virar", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
  //   { title:'Computers & Tech', suffix:"C", subtitle:"", address:"Dahisar", icon:"../../assets/img/trip/thumb/trip_4.jpg" } ,
  //   { title:'Cooking', subtitle:"Panvel",suffix:"C", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
  //   { title:'Hobbies & Crafts', subtitle:"Kolad",suffix:"H", address:"", icon:"../../assets/img/trip/thumb/trip_5.jpg" }
  // ];
  iscatadd: boolean = false;
  iconName: string="add";
  items : any;
  booksdata: any;
  catName: string;

  constructor(
    public api: RestApiProvider,
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.initialize();
  }

  initialize(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    // this.api._postAPI("GetBooksData",{"Mode":"C"}).subscribe(res => {
    //   // alert('GetBooksData ::'+ JSON.stringify(res));
    //   this.items = res.GetBooksDataResult;
    // },(err) => {
    //     alert('Error:'+err);
    // });
    // this.items = this.api.booksData.Categories;
    // this.booksdata = localStorage.getItem('BooksData');
    // this.items = this.booksdata;
    this.items = JSON.parse(localStorage.getItem('BooksData'));
    // alert('items' + JSON.stringify(this.items));
    loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcategoryPage');
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
    if(this.catName.length >0){
      let params = {
        "CategoryName":  this.catName,
        "cmd": "1",
        "Email": "testign@testing.com"
      };
      this.api._postAPI("ManageCategories",params).subscribe(res => {
        // alert('ManageCategories ::'+ JSON.stringify(res.ManageCategoriesResult));
        if(res.ManageCategoriesResult.length >0){
          this.api.presentAlert('Alert!','New Category added sucessfully.');
          this.getBooksData();
          loading.dismiss();
        }else{
          this.api.presentAlert('Error',res.ManageCategoriesResult.Message)
          loading.dismiss();
        }
      },(err) => {
          alert('Error:'+err);
      });
    }else{
      this.api.presentAlert('Error','Please provide Category name')
    }
    
  }

  deleteCategory(CatId:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params =  {
        "CategoryID":CatId,
        "CategoryName": "",
        "cmd": "2",
        "Email": "testign@testing.com"
    }
    this.api._postAPI("ManageCategories",params).subscribe(res => {
      // alert('ManageCategories ::'+ JSON.stringify(res.ManageCategoriesResult));
      if(res.ManageCategoriesResult.length >0){
        this.api.presentAlert('Alert!','Category Deleted sucessfully.');
        this.getBooksData();
        loading.dismiss();
      }else{
        this.api.presentAlert('Error',res.ManageCategoriesResult.Message)
        loading.dismiss();
      }
    },(err) => {
        alert('Error:'+err);
    });
  }

  addcategory(){
    if(this.iscatadd == false){
      this.iscatadd = true;
      this.iconName = "close";
    }else{
      this.iscatadd = false;
      this.iconName = "add";
    }
  }

}
