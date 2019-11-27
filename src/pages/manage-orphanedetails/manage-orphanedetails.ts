import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityService } from '../../services/activity-service';
/**
 * Generated class for the ManageOrphanedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-orphanedetails',
  templateUrl: 'manage-orphanedetails.html',
})
export class ManageOrphanedetailsPage {
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
      this.trip = service.getItem(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageOrphanedetailsPage');
  }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }


}
