import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ManagebooksPage } from '../managebooks/managebooks';
import { ActivityService } from '../../services/activity-service';

@IonicPage()
@Component({
  selector: 'page-bookdetails',
  templateUrl: 'bookdetails.html',
})
export class BookdetailsPage {
  // trip info
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;
  recordArray: { "Name": string; "Age": number; "Post": string; }[];

  constructor(
    public app:App,
    public navCtrl: NavController, 
    public service: ActivityService,
    public navParams: NavParams) {
      this.trip = { "id":1,"title":"Rich Dad Poor Dad","subtitle":"Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, ... ","publisher":"Book by Robert Kiyosaki and Sharon Lechter","category":"Self-help book","author":"Robert Kiyosaki, Sharon Lechter","price":320,"sold":"7","totalstock":10,"added_on":"2006-03-12","booksliked":"95% liked this book","available":3,"Pagecount":207,"thumb":"assets/img/books/ngo1.jpeg","location":"Vinayalaya Rd, Gundavali, Andheri East, Mumbai, Maharashtra 400093","images":["assets/img/trip/thumb/trip_1.jpg","assets/img/trip/thumb/trip_2.jpg","assets/img/trip/thumb/trip_3.jpg","assets/img/trip/thumb/trip_4.jpg" ]};
      // this.trip = service.getItem(1);
      console.log(JSON.stringify(this.trip));
    }
    ionViewDidLoad() {
    }

  back() {
    let nav = this.app.getRootNav(); 
    nav.setRoot(ManagebooksPage, {tabIndex: 2});
  }
}
