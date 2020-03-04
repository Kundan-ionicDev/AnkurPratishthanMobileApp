import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BookdetailsPage } from '../bookdetails/bookdetails';
import { SettingsPage } from '../settings/settings';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BookinfoPage } from '../bookinfo/bookinfo';


@IonicPage()
@Component({
  selector: 'page-allbooks',
  templateUrl: 'allbooks.html',
})
export class AllbooksPage {
  isbookadding: boolean = false;
  iconName: string = "add";
  encodeData: any;
  bookname: any;
  items: any;
  usrRoleId: number;
  frmbooks: FormGroup;
  categories: any;
  publishers: any;
  languages: any;
  image: string;
  photos = [];
  picture = [];
  imagePath : any ="data:image/jpeg;base64,";

  constructor(
    private camera: Camera,
    public api: RestApiProvider,
    public navCtrl: NavController,
    public app: App,
    private formBuilder: FormBuilder,
    public apiProvider: RestApiProvider,
    private barcodeScanner: BarcodeScanner,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.usrRoleId = this.apiProvider.UserRoleId;
    this.initializeItems();
    this.frmbooks = this.formBuilder.group({
      // thumbimage : new FormControl('', [Validators.required]),
      // image : new FormControl('', [Validators.required]),
      bookname: new FormControl('', [Validators.required]),
      bookdescription: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      Category: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required])
    });
    //this.presentActionSheet();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AllbooksPage');
  }

  addbook() {
    if (this.isbookadding == false) {
      this.isbookadding = true;
      this.iconName = "close";
    } else {
      this.isbookadding = false;
      this.iconName = "add";
    }
  }

  // Show Book Information
  bookInfo(item:any){
    this.navCtrl.push(BookinfoPage,{
      bookInfo:item
    });
  }

  addBook() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    // alert('this.frmbooks.value' + JSON.stringify(this.frmbooks.value));
    if (this.frmbooks.valid && this.photos.length >0) {
      let params = {
        "BookName": this.frmbooks.value.bookname,
        "cmd": "1",
        "BookDescription":this.frmbooks.value.bookdescription,
        "EmailID": "kundansakpal@gmail.com",
        "Price": this.frmbooks.value.price,
        "Author": this.frmbooks.value.author,
        "Stock": this.frmbooks.value.quantity,
        "CategoryID": this.frmbooks.value.Category,
        "LanguageID": this.frmbooks.value.language,
        "PublisherID": this.frmbooks.value.publisher,
        "BookID": "",
        "ThumbImg64": this.photos[0].Image,
        "Img1":this.photos[1].Image
      };
      
      // alert('params :'  + JSON.stringify(params));
      this.api._postAPI("ManageBooks", params).subscribe(res => {
        // User exists
        // alert('Manage Books Data ::'+ JSON.stringify(res.ManageBooksResult));
        if(res.ManageBooksResult.length >0){
          this.api.presentAlert('Alert!','Book Added Sucessfully');
          loading.dismiss();
          this.frmbooks.reset();
          this.initializeItems();
        }else{
          this.api.presentAlert('Alert!','Please try again.');
          loading.dismiss();
        }
      }, (err) => {
        // alert('Error:' + err);
        this.api.presentAlert('Error!',err);
        loading.dismiss();
      });
      // this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'Kundan Sakpal').then((encodedData) => {
      //     this.encodeData = encodedData;
      // }, (err) => {
      //     console.log("Error occured : " + err);
      // }); 
    } else {
      if(!this.frmbooks.valid){
        this.api.presentAlert('Error!','All Fields are mandatory');
      }else if(this.photos.length <=0){
        this.api.presentAlert('Error!','Please provide photos');
      }
      loading.dismiss();
    }
  }

  // Delete Book Details
  deleteBook(item:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...while book gets deleted'
    });
  
    loading.present();
    let params = {
      "BookName": item.BookName,
      "cmd": "3", // Command 3 for Delete Book
      "EmailID": "kundansakpal@gmail.com",
      "Price": item.Price,
      "Author": item.AuthorName,
      "Stock": item.Stock,
      "CategoryID": item.CategoryID,
      "LanguageID": item.LanguageID,
      "PublisherID": item.PublisherID,
      "BookID": item.BookID
    };
    this.apiProvider._postAPI("ManageBooks", params).subscribe(res => {
      // Manage Books Data
      // alert('Manage Books Data ::'+ JSON.stringify(res.ManageBooksResult));
      if(res.ManageBooksResult.length >0){
        this.apiProvider.presentAlert('Alert!','Book Deleted Sucessfully');
        this.initializeItems();
        loading.dismiss();
      }else{
        this.apiProvider.presentAlert('Alert!','Something went wrong. Please try again!!!');
        loading.dismiss();
      }
    }, (err) => {
      this.api.presentAlert('Error!',err);
      loading.dismiss();
    });
  }


  deletePhoto(index) {
    // this.photos.splice(index, 1);
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete this photo?',
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
            this.photos.splice(index, 1);
          }
        }
      ]
    });
  confirm.present();
   }

   
  AccessGallery(){
    if(this.photos.length <2){
      this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL
       }).then((imageData) => {
        // alert('imageData'+ JSON.stringify(imageData));
         // this.image = 'data:image/jpeg;base64,'+imageData;
         this.image = imageData;
         // alert('image : '+ this.image);
           this.photos.push(
            { "Image":this.image }
           );
         this.photos.reverse();
         this.picture = imageData;
            }, (err) => {
             this.displayErrorAlert(err);
       });
    }else{
      this.api.presentAlert('Alert','Only 2 photos are allowed.');
    }
   }
   
   AccessCamera(){
    if(this.photos.length <2){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 200,
        targetHeight: 200
      };
  
      this.camera.getPicture(options).then((imageData) => {
          // alert('imageData'+ JSON.stringify(imageData));
          //this.image = 'data:image/jpeg;base64,' + imageData;
          this.image = imageData;
          // alert('image : '+ this.image);
          this.photos.push(
            { "Image":this.image }
           );
            // alert('photos length' + JSON.stringify(this.photos.length));
          this.photos.reverse(); 
        }, (err) => {
          this.displayErrorAlert(err);
        });
    }else{
      this.api.presentAlert('Alert','Only 2 photos are allowed.');
    }
  }

  displayErrorAlert(err){
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'Error while trying to capture picture',
       buttons: ['OK']
     });
     alert.present();
  }


  bookDetails(item: any) {
    let nav = this.app.getRootNav();
    nav.setRoot(BookdetailsPage, {
      bookData: item
    });
  }

  initializeItems() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.api._postAPI("GetBooks", '').subscribe(res => {
        if (res.GetBooksResult.length > 0) {
          this.items = res.GetBooksResult;
        } else {
          alert('No data available.')
        }
      }, (err) => {
        alert('Error:' + err);
      });
    loading.dismiss();
    this.items = JSON.parse(localStorage.getItem('BooksData'));
    this.categories = this.items[0].Categories;
    this.publishers = this.items[0].Publishers;
    this.languages = this.items[0].Languages;
  }

  filterItems(ev) {
    var val = ev.target.value;
    if (val.trim() !== '') 
    {
      this.items = this.items.filter((item) => 
      {
        return item.BookName.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
        item.CategoryName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.PublisherName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.AuthorName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.Language.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }else{
      this.initializeItems();
    }
  }
}
