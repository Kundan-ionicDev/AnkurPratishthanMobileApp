import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import {
  App
} from 'ionic-angular';
import {
  BarcodeScanner
} from "@ionic-native/barcode-scanner";
import {
  BookdetailsPage
} from '../bookdetails/bookdetails';
import {
  SettingsPage
} from '../settings/settings';
import {
  RestApiProvider
} from '../../providers/rest-api/rest-api';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AllbooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(
    public api: RestApiProvider,
    public navCtrl: NavController,
    public app: App,
    private formBuilder: FormBuilder,
    public apiProvider: RestApiProvider,
    private barcodeScanner: BarcodeScanner,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.usrRoleId = this.apiProvider.UserRoleId;
    this.initializeItems();
    this.frmbooks = this.formBuilder.group({
      bookname: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      Category: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
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

  addBook() {
    if (this.frmbooks.valid) {
      let params = {
        "BookName": this.frmbooks.value.bookname,
        "cmd": "1",
        "EmailID": "kundansakpal@gmail.com",
        "Price": this.frmbooks.value.price,
        "Author": this.frmbooks.value.author,
        "Stock": this.frmbooks.value.quantity,
        "CategoryID": this.frmbooks.value.Category,
        "LanguageID": '1',//this.frmbooks.value.language,
        "PublisherID": '2',//this.frmbooks.value.publisher,
        "BookID": ""
      };
      this.api._postAPI("ManageBooks", params).subscribe(res => {
        // User exists
        alert('Manage Books Data ::'+ JSON.stringify(res.ManageBooksResult));
        this.api.presentAlert('Alert!','Book Added Sucessfully');
        this.frmbooks.reset();
        this.initializeItems();
      }, (err) => {
        alert('Error:' + err);
      });
      // this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'Kundan Sakpal').then((encodedData) => {
      //     this.encodeData = encodedData;
      // }, (err) => {
      //     console.log("Error occured : " + err);
      // }); 
    } else {
      alert('All Fields are mandatory');
    }
  }

  editBook(action:any, item: any) {
    
  }

  bookDetails(item: any) {
    let nav = this.app.getRootNav();
    nav.setRoot(BookdetailsPage, {
      bookData: item
    });
  }

  initializeItems() {
    // this.items = [
    //   { title:'The Poets Laureate Anthology', subtitle:"An anthology is a collection of series of works such as short stories, poems, essays, plays, etc. by different authors into a single volume for publication. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 1", category:"Anthology", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
    //   { title:'To Kill a Mockingbird', subtitle:"To Kill a Mockingbird. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 2", category:"Anthology", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
    //   { title:'Batman: The Dark Knight Returns', subtitle:"Batman: The Dark Knight Returns anthology is a collection of series of works such as short stories, poems, essays, plays, etc. by different authors into a single volume for publication. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 3", category:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
    //   { title:'Sherlock Holmes', subtitle:"Arthur Conan Doyle for publication. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 3", category:"Comic and Graphic Novel", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" }
    // ];
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.api._postAPI("GetBooks", '').subscribe(res => {
        // User exists
        // alert('Books Data ::'+ JSON.stringify(res.GetBooksResult));
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
    // alert('categories :' + JSON.stringify(this.categories));
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(val);
      });
    }
  }
}
