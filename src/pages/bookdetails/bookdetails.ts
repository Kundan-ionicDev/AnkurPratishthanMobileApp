import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { ManagebooksPage } from '../managebooks/managebooks';
import { ActivityService } from '../../services/activity-service';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

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
  
  constructor(
    public app:App,
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
      this.roleId = this.apiProvider.UserRoleId;
      console.log(JSON.stringify(this.slideimgs));
    }
    ionViewDidLoad() {
    }

  back() {
    let nav = this.app.getRootNav(); 
    nav.setRoot(ManagebooksPage, {tabIndex: 2});
  }
}
