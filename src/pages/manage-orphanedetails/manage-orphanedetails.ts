import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddusersPage } from '../addusers/addusers';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

@IonicPage()
@Component({
  selector: 'page-manage-orphanedetails',
  templateUrl: 'manage-orphanedetails.html',
})
export class ManageOrphanedetailsPage {
  clusterData: any;
  frmclusterDetails : FormGroup;
  roleId: number;
  librariandata: any;
  librarianname: number;

  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    public apiProvider: RestApiProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.roleId = this.apiProvider.UserRoleId;
      this.frmclusterDetails = this.formBuilder.group({
        ClusterName: new FormControl(''),
        ClusterCode: new FormControl(''),
        Address: new FormControl(''),
        MobileNo: new FormControl(''),
        Members: new FormControl(''),
        Librarian :new FormControl('')
      });

      navParams.get('clusterData');
      this.clusterData = navParams.data.clusterData;
      // alert('bookdata'+ JSON.stringify(this.clusterData));
      this.initialize();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ManageOrphanedetailsPage');
  }

  back(){
    this.navCtrl.setRoot(AddusersPage);
  }

  initialize(){
    this.apiProvider._postAPI('GetLibrarians', '').subscribe(res => {
      // Get Librarians
      if (res.GetLibrariansResult.length > 0) {
        this.librariandata = res.GetLibrariansResult;
      } else {
        this.apiProvider.presentAlert('Alert','No data available');
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error',err);
    });
  }

  librarianDetails(local){
    console.log(local.target.value)
  }

  updateCluster(){
    if(this.frmclusterDetails.valid){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      let params =  {
        "ClusterName": this.frmclusterDetails.value.ClusterName,
        "ClusterCode": this.frmclusterDetails.value.ClusterCode,
        "EmailID": this.frmclusterDetails.value.Email,
        "Address": this.frmclusterDetails.value.Address,
        "MobileNo": this.frmclusterDetails.value.MobileNo,
        "Members": this.frmclusterDetails.value.Members,
        "AdminEmailID": this.frmclusterDetails.value.Email,
        "LibrarianId":this.frmclusterDetails.value.Librarian,
        "cmd": "2",
        "ClusterID": this.frmclusterDetails.value.ClusterID
      };
      
      // alert('Update Data:' + JSON.stringify(params));
      
      this.apiProvider._postAPI("ManageClusters",params).subscribe(res => {
        if(res.ManageClustersResult.length >0){
          this.apiProvider.presentAlert('Alert!','Cluster Details Updated sucessfully.');
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Error',res.ManageClustersResult.Message)
          loading.dismiss();
        }
      },(err) => {
          this.apiProvider.presentAlert('Error',err);
      });
    }else{
      this.apiProvider.presentAlert('Oops','Please provide all details');
    }
  }
}
