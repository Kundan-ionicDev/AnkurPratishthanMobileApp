import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AddusersPage } from '../addusers/addusers';

/**
 * Generated class for the LibrariandetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-librariandetails',
  templateUrl: 'librariandetails.html',
})
export class LibrariandetailsPage {
  librarianData: any;
  frmlibrarianDetails : FormGroup;
  roleId: any;
  pagetitle: any;
  librarianDetails: any;
  clusterDetails: any;
  constructor(
    public apiProvider: RestApiProvider,
    private formBuilder: FormBuilder,
    public api: RestApiProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.librarianData = navParams.data.librariabData;
       alert('librarianData' + JSON.stringify(this.librarianData));
      this.initialize();
      // Member
      this.frmlibrarianDetails = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        EmailID: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        DOB: ['', Validators.required],
        Address: ['', Validators.required],
        MobileNo: ['', Validators.required],
        ClusterName: ['', Validators.required]
      });
      this.roleId = this.apiProvider.UserRoleId;
      this.pagetitle = this.apiProvider._selectedtitle;
  }

  back(){
    this.navCtrl.setRoot(AddusersPage);
  }
  
  initialize(){
    //alert('cluster details' + JSON.stringify(this.clusterData));
    this.apiProvider._postAPI('GetClusters', '').subscribe(res => {
      // Clusters list
      this.clusterDetails = res.GetClustersResult;
      // alert('clusterData :-' + JSON.stringify(this.clusterDetails));
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MemberdetailsPage');
  }

  updateLibrarian(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    // alert('updateLibrarian' + JSON.stringify(this.frmlibrarianDetails.value));
    if (this.frmlibrarianDetails.valid) {
      let params = {
        "cmd": "2",
        "FirstName": this.frmlibrarianDetails.value.FirstName,
        "LastName": this.frmlibrarianDetails.value.LastName,
        "EmailID": this.frmlibrarianDetails.value.EmailID,
        "Address": this.frmlibrarianDetails.value.Address,
        "DOB": this.frmlibrarianDetails.value.DOB,
        "MobileNo": this.frmlibrarianDetails.value.MobileNo,
        "AltMobileNo": '',
        "ClusterID": this.frmlibrarianDetails.value.ClusterName,
        "AdminEmailID": "kundan@gmail.com",
        "LibrarianID": this.librarianData.LibrarianID,
        "Image64":""
      };
      
      // alert('ManageLibrarians Data ::' + JSON.stringify(params));
      this.api._postAPI('ManageLibrarians', params).subscribe(res => {
       if(res.ManageLibrariansResult.length >0){
        this.api.presentAlert('Alert', 'Librarian details updated sucessfully.');
        this.frmlibrarianDetails.reset();
       }else{
        this.api.presentAlert('Alert', 'Please try again');
       }
      }, (err) => {
        this.api.presentAlert('Error', err);
      });
      loading.dismiss();
    } else {
      this.api.presentAlert('Error', 'All fields are mandatory');
      loading.dismiss();
    }
  }

}
