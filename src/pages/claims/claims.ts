import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ClaimsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-claims',
  templateUrl: 'claims.html',
})
export class ClaimsPage {
  items: { requested: string; requestedFor: string; requestedDate: string; bookname: string; author: string; icon: string; }[];
  message: string;

  constructor(
    public toastController: ToastController,
    public navCtrl: NavController, 
    public alert: AlertController,
    public navParams: NavParams) {
      this.items = [
        { requested:'Prenav', requestedFor:"Kundan", requestedDate:"2019-11-01", bookname:"Harry Potter", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
        { requested:'Udhav', requestedFor:"Ketan", requestedDate:"2019-11-02", bookname:"MIchael", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
        { requested:'Mahesh', requestedFor:"Anil", requestedDate:"2019-10-01", bookname:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
        { requested:'NGO', requestedFor:"Puesh", requestedDate:"2019-11-27", bookname:"SQuare Panda", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" },
        { requested:'Prenav', requestedFor:"Kundan", requestedDate:"2019-11-01", bookname:"Harry Potter", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
        { requested:'Udhav', requestedFor:"Ketan", requestedDate:"2019-11-02", bookname:"MIchael", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
        { requested:'Mahesh', requestedFor:"Anil", requestedDate:"2019-10-01", bookname:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
        { requested:'NGO', requestedFor:"Puesh", requestedDate:"2019-11-27", bookname:"SQuare Panda", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" },
        { requested:'Prenav', requestedFor:"Kundan", requestedDate:"2019-11-01", bookname:"Harry Potter", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Poets.jpeg" } ,
        { requested:'Udhav', requestedFor:"Ketan", requestedDate:"2019-11-02", bookname:"MIchael", author:"Harper Lee", icon:"assets/img/books/ToKillaMockingbird.jpeg" } ,
        { requested:'Mahesh', requestedFor:"Anil", requestedDate:"2019-10-01", bookname:"Comic and Graphic Novel", author:"Frank Miller", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" } ,
        { requested:'NGO', requestedFor:"Puesh", requestedDate:"2019-11-27", bookname:"SQuare Panda", author:"Elizabeth Hun Schmidt", icon:"assets/img/books/Batman-TheDarkKnightReturns.jpeg" }
      ];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ClaimsPage');
  }

  async action(id:any){
    if(id == 1){
      this.message = "Request Accepted....";
    }else if(id == 2){
      this.message = "Request Rejected...";
    }
    const toast = await this.toastController.create({
      message: this.message,
      duration: 6000
    });
    toast.present();
  }

}
