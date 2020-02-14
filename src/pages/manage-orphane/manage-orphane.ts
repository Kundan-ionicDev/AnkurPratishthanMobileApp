import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ManageOrphanePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-orphane',
  templateUrl: 'manage-orphane.html',
})
export class ManageOrphanePage {

  items = [
    { title:'Saad Foundation', subtitle:"Dadar", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Satkarma Ashram' , subtitle:"Andheri", address:"", icon:"../../assets/img/trip/thumb/trip_2.jpg" } ,
    { title:'Aarna Foundation', subtitle:"Bandra", address:"", icon:"../../assets/img/trip/thumb/trip_3.jpg" } ,
    { title:'Arnav Charitable Trust' , subtitle:"Sion", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Desire Society' , subtitle:"", address:"Virar", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Girija Foundation', subtitle:"", address:"Dahisar", icon:"../../assets/img/trip/thumb/trip_4.jpg" } ,
    { title:'Compassion Charitable Trust', subtitle:"Panvel", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Nirankar Old Age Home', subtitle:"Kolad", address:"", icon:"../../assets/img/trip/thumb/trip_5.jpg" } ,
    { title:'Second Inning House', subtitle:"Thane", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Shree Ganesh Oldage Home', subtitle:"Andheri", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Cancer Control Mission', subtitle:"Kurla", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Disha Foundation', subtitle:"Malad", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Mery Foundation', subtitle:"Marine lines", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Parash Dnyan Shikshan Prasa..', subtitle:"Churchgate", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'Shree Manav Seva Sangh', subtitle:"Vakola", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'St Catherines Home', subtitle:"Belapur", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
    { title:'MA Niketan' , subtitle:"Sion", address:"", icon:"../../assets/img/trip/thumb/trip_1.jpg" } ,
  ];
  constructor(
    public navCtrl: NavController, 
    
    public navParams: NavParams) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageOrphanePage');
  }

  

  itemSelected(item:any){
    this.navCtrl.push('ManageOrphanedetailsPage');
  }

}
