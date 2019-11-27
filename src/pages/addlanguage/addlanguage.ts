import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddlanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addlanguage',
  templateUrl: 'addlanguage.html',
})
export class AddlanguagePage {
  islanguageadd: boolean = false;
  items = [
    { title:'English', subtitle:"Dadar", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Marathi' , subtitle:"Andheri", address:"", icon:"../../assets/img/trip/thumb/trip_2.jpg" },
    { title:'Hindi', subtitle:"Bandra", address:"", icon:"../../assets/img/trip/thumb/trip_3.jpg" } ,
    { title:'Telgu' , subtitle:"Sion", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Urdu' , subtitle:"", address:"Virar", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Gujrati', subtitle:"", address:"Dahisar", icon:"../../assets/img/trip/thumb/trip_4.jpg" }
  ];
  iconName: string="add";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddlanguagePage');
  }

  addlanguage(){
    if(this.islanguageadd == false){
      this.islanguageadd = true;
      this.iconName = "close";
    }else{
      this.islanguageadd = false;
      this.iconName = "add";
    }
  }

}
