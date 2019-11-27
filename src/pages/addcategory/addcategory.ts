import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  items = [
    { title:'Arts & Music', subtitle:"Dadar",suffix:"A", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Biographies' , subtitle:"Andheri",suffix:"B", address:"", icon:"../../assets/img/trip/thumb/trip_2.jpg" },
    { title:'Business', subtitle:"Bandra",suffix:"B", address:"", icon:"../../assets/img/trip/thumb/trip_3.jpg" } ,
    { title:'Kids' , subtitle:"Sion",suffix:"K", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Comics' , subtitle:"", suffix:"C", address:"Virar", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Computers & Tech', suffix:"C", subtitle:"", address:"Dahisar", icon:"../../assets/img/trip/thumb/trip_4.jpg" } ,
    { title:'Cooking', subtitle:"Panvel",suffix:"C", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Hobbies & Crafts', subtitle:"Kolad",suffix:"H", address:"", icon:"../../assets/img/trip/thumb/trip_5.jpg" }
  ];
  iscatadd: boolean = false;
  iconName: string="add";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcategoryPage');
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
