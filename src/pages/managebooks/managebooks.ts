import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SuperTabs } from 'ionic2-super-tabs';
import { ActivityService } from '../../services/activity-service';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

@IonicPage()
@Component({
  selector: 'page-managebooks',
  templateUrl: 'managebooks.html',
})
export class ManagebooksPage {
  booksData: any;
  sliderConfig = {
    autoplay: false,
    pages:true,
    zoom: {
      maxRatio: 4
    },
    slidesPerView: 2.9,
    spaceBetween: 2,
    centeredSlides: false
  };
  pages = [
    // Adim Book Management Pages
    { pageName: 'AllbooksPage', title: 'Books', icon: 'book', id: 'newsTab', role:1 },
    { pageName: 'AddcategoryPage', title: 'Category', icon: 'basket', id: 'aboutTab', role:1 },
    { pageName: 'AddpublisherPage', title: 'Publisher', icon: 'appstore', id: 'accountTab', role:1 },
    { pageName: 'AddlanguagePage', title: 'Language', icon: 'at', id: 'accountTab', role:1 },

    // Cluster Book Management Pages
    { pageName: 'AllbooksPage', title: 'Books', icon: 'book', id: 'newsTab', role:2 },
    { pageName: 'ClaimsPage', title: 'Claim(s)', icon: 'closed-captioning', id: 'newsTab', role:2 },

     // Librarian Book Management Pages
     { pageName: 'AllbooksPage', title: 'Books', icon: 'book', id: 'newsTab', role:3 },
     { pageName: 'ClaimsPage', title: 'Claim(s)', icon: 'closed-captioning', id: 'newsTab', role:3 },

      // Member Book Management Pages
    { pageName: 'AllbooksPage', title: 'Books', icon: 'book', id: 'newsTab', role:4 },
    { pageName: 'ClaimsPage', title: 'My Claim(s)', icon: 'closed-captioning', id: 'newsTab', role:4 }
  ];
 
  selectedTab = 0;
 
  // @ViewChild(SuperTabs) superTabs: SuperTabs;
  // trip info
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;
  roleId: number;


  constructor(
    public navCtrl: NavController, 
    public apiProvider: RestApiProvider,
    public service: ActivityService,
    public navParams: NavParams) {
      this.initialize();
      this.trip = service.getItem(1);
      this.roleId = this.apiProvider.UserRoleId;
  }

  onTabSelect(ev: any) {
    this.selectedTab = ev.index;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ManagebooksPage');
  }


  initialize(){
    this.apiProvider._postAPI("GetBooksData", '').subscribe(res => {
      // alert('Books Data ::'+ JSON.stringify(res.GetBooksDataResult));
      // this.apiProvider.booksData = res.GetBooksDataResult;
      let obj = res.GetBooksDataResult;
      localStorage.setItem('BooksData',JSON.stringify(obj))

    }, (err) => {
      alert('Error:' + err);
    });
  }
}
