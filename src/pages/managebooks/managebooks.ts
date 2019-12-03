import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { ActivityService } from '../../services/activity-service';

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
    { pageName: 'AllbooksPage', title: 'Books', icon: 'flame', id: 'newsTab'},
    { pageName: 'AddcategoryPage', title: 'Category', icon: 'help-circle', id: 'aboutTab'},
    { pageName: 'AddpublisherPage', title: 'Publisher', icon: 'body', id: 'accountTab'},
    { pageName: 'AddlanguagePage', title: 'Language', icon: 'body', id: 'accountTab'}
  ];
 
  selectedTab = 0;
 
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  // trip info
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;


  constructor(
    public navCtrl: NavController, 
    public service: ActivityService,
    public navParams: NavParams) {
    // this.weatherProvider.getBooks().subscribe((res) => {
    //   this.booksData = res;
    //   alert('Books Data' + JSON.stringify(this.booksData));
    // });
    this.trip = service.getItem(1);
  }

  onTabSelect(ev: any) {
    // if (ev.index === 2) {
    //   let alert = this.alertCtrl.create({
    //     title: 'Secret Page',
    //     message: 'Are you sure you want to access that page?',
    //     buttons: [
    //       {
    //         text: 'No',
    //         handler: () => {
    //           this.superTabs.slideTo(this.selectedTab);
    //         }
    //       }, {
    //         text: 'Yes',
    //         handler: () => {
    //           this.selectedTab = ev.index;
    //         }
    //       }
    //     ]
    //   });
    //   alert.present();
    // } else {
    //   this.selectedTab = ev.index;
    //   this.superTabs.clearBadge(this.pages[ev.index].id);
    // }
    this.selectedTab = ev.index;
    this.superTabs.clearBadge(this.pages[ev.index].id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagebooksPage');
  }

  

}
