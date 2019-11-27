import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddpublisherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpublisher',
  templateUrl: 'addpublisher.html',
})
export class AddpublisherPage {
  ispublisheradd: boolean = false;
  iconName:string= "add";
  items = [
    { title:'Dean Koontz', subtitle:"Dadar", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Malcolm Gladwell' , subtitle:"Andheri", address:"", icon:"../../assets/img/trip/thumb/trip_2.jpg" },
    { title:'Jeff Kinney', subtitle:"Bandra", address:"", icon:"../../assets/img/trip/thumb/trip_3.jpg" } ,
    { title:'Gregg Olsen' , subtitle:"Sion", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Carolyn Brown' , subtitle:"", address:"Virar", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Lee Child', subtitle:"", address:"Dahisar", icon:"../../assets/img/trip/thumb/trip_4.jpg" }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpublisherPage');
  }

  addpublisher(){
    if(this.ispublisheradd == false){
      this.ispublisheradd = true;
      this.iconName = "close";
    }else{
      this.ispublisheradd = false;
      this.iconName = "add";
    }
   
  }

}
