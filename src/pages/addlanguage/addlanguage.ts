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
    { title:'Amharic', subtitle:"Dadar", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Arabic' , subtitle:"Andheri", address:"", icon:"../../assets/img/trip/thumb/trip_2.jpg" },
    { title:'Basque', subtitle:"Bandra", address:"", icon:"../../assets/img/trip/thumb/trip_3.jpg" } ,
    { title:'Bengali' , subtitle:"Sion", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'English (UK)	' , subtitle:"", address:"Virar", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Portuguese (Brazil)', subtitle:"", address:"Dahisar", icon:"../../assets/img/trip/thumb/trip_4.jpg" },
    { title:'Bulgarian' },
    { title:'Catalan' },
    { title:'Cherokee' },
    { title:'Croatian' },
    { title:'Czech' },
    { title:'Danish' },
    { title:'Dutch' },
    { title:'English (US)' },
    { title:'Estonian' },
    { title:'Filipino' },
    { title:'Finnish' },
    { title:'French' },
    { title:'German' },
    { title:'Greek' },
    { title:'Gujarati' },
    { title:'Hebrew' },
    { title:'Hindi' },
    { title:'Hungarian' },
    { title:'Icelandic' },
    { title:'Indonesian' },
    { title:'Italian' },
    { title:'Japanese' },
    { title:'Kannada' },
    { title:'Korean' },
    { title:'Latvian' },
    { title:'Lithuanian' },
    { title:'Malay' },
    { title:'Malayalam' },
    { title:'Malayalam' },
    { title:'Norwegian' },
    { title:'Polish' },
    { title:'Portuguese (Portugal)' },
    { title:'Romanian' },
    { title:'Russian' },
    { title:'Serbian' },
    { title:'Chinese (PRC)' },
    { title:'Slovak' },
    { title:'Slovenian' },
    { title:'Spanish' },
    { title:'Swahili' },
    { title:'Swedish' },
    { title:'Tamil' },
    { title:'Telugu' },
    { title:'Thai' },
    { title:'Chinese (Taiwan)' },
    { title:'Turkish' },
    { title:'Urdu' },
    { title:'Ukrainian' },
    { title:'Vietnamese' },
    { title:'Welsh' }
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
