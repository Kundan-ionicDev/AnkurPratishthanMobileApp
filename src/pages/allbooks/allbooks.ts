import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BookdetailsPage } from '../bookdetails/bookdetails';
import { SettingsPage } from '../settings/settings';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


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
  isbookadding:boolean = false;
  iconName: string = "add";
  encodeData: any;
  bookname:any;
  items: any;
  usrRoleId: number;

  constructor(
    public navCtrl: NavController, 
    public app:App,
    public apiProvider: RestApiProvider,
    private barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {
      this.usrRoleId = this.apiProvider.UserRoleId;
      this.initializeItems()
  }

  
  ionViewDidLoad() {
    // console.log('ionViewDidLoad AllbooksPage');
  }

  addbook(){
    if(this.isbookadding == false){
      this.isbookadding = true;
      this.iconName = "close";
    }else{
      this.isbookadding = false;
      this.iconName = "add";
    }
  }

  encodedText(){
    // alert('this.bookname' + this.bookname);
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'Kundan Sakpal').then((encodedData) => {
        this.encodeData = encodedData;
    }, (err) => {
        console.log("Error occured : " + err);
    });                 
 }
 
  bookDetails(){
   let nav = this.app.getRootNav(); 
    nav.setRoot(BookdetailsPage, {tabIndex: 2});
  }

  initializeItems() {
    this.items = [
      { title:'The Poets Laureate Anthology', subtitle:"An anthology is a collection of series of works such as short stories, poems, essays, plays, etc. by different authors into a single volume for publication. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 1", category:"Anthology", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
      { title:'To Kill a Mockingbird', subtitle:"To Kill a Mockingbird. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 2", category:"Anthology", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
      { title:'Batman: The Dark Knight Returns', subtitle:"Batman: The Dark Knight Returns anthology is a collection of series of works such as short stories, poems, essays, plays, etc. by different authors into a single volume for publication. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 3", category:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
      { title:'Sherlock Holmes', subtitle:"Arthur Conan Doyle for publication. The selection of such works is made based on some common theme or subject of books and usually done by an editor or small editorial board.", publisher:"Publisher 3", category:"Comic and Graphic Novel", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" }
    ];  
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
