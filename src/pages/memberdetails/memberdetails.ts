import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AddusersPage } from '../addusers/addusers';

@IonicPage()
@Component({
  selector: 'page-memberdetails',
  templateUrl: 'memberdetails.html',
})
export class MemberdetailsPage {
  memberData: any;
  frmmemberDetails : FormGroup;
  roleId: any;
  pagetitle: any;
  clusterDetails: any;
  constructor(
    public apiProvider: RestApiProvider,
    private formBuilder: FormBuilder,
    public api: RestApiProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      // navParams.get('memberData');
      // navParams.get('clusterData');
      // alert('navParams.data' + JSON.stringify(navParams.data.clusterData));
      // this.clusterData = navParams.data.clusterData;
      this.memberData = navParams.data.memberData;
      // alert('Member Data :'+ JSON.stringify(this.clusterData));
      this.initialize();
      // console.log('member', JSON.stringify(this.clusterData));
      // Member
      this.frmmemberDetails = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        EmailID: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        DOB:['', Validators.required],
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

  updateMember(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    // alert('updateLibrarian' + JSON.stringify(this.frmmemberDetails.value));
    if (this.frmmemberDetails.valid) {
      let params = {
        "cmd": "2",
        "FirstName": this.frmmemberDetails.value.FirstName,
        "LastName": this.frmmemberDetails.value.LastName,
        "EmailID": this.frmmemberDetails.value.EmailID,
        "Address": this.frmmemberDetails.value.Address,
        "DOB": this.frmmemberDetails.value.DOB,
        "MobileNo": this.frmmemberDetails.value.MobileNo,
        "AltMobileNo": '',
        "ClusterID": this.frmmemberDetails.value.ClusterName,
        "AdminEmailID": "kundan@gmail.com",
        "MemberID": this.memberData.MemberID,
        "Image64":""
      };
      
      // alert('ManageLibrarians Data ::' + JSON.stringify(params));
      this.api._postAPI('Managemembers', params).subscribe(res => {
       if(res.ManageLibrariansResult.length >0){
        this.api.presentAlert('Alert', 'Member details updated sucessfully.');
        this.frmmemberDetails.reset();
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
