import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { Contacts } from '@ionic-native/contacts';

/**
 * Generated class for the CelebratewithusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-celebratewithus',
  templateUrl: 'celebratewithus.html',
})
export class CelebratewithusPage {
  celebrateregister : FormGroup;
  isCelebrateAdd: boolean;
  iconName: string ='add';
  userLogin: { EmailID: string; FullName: string; RoleID: string; };
  celebrateusData: any;
  fname: string;
  lname: any;
  email: any;
  areaid: any;
  occassionid: any;
  expectedevdt: any;
  cnumber: any;
  manageId: string= "1";
  requestId: any;
  celeReqId: any;
  updateReq: boolean = false;
  contactnumber: any;
  emailid: any;
  constructor(
    private contacts: Contacts,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, 
    public apiProvider: RestApiProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.celebrateregister = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        contactnumber: ['', Validators.required],
        emailaddress: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        area: ['', Validators.required],
        occassion: ['', Validators.required],
        expectedevdate: ['', Validators.required]
      });
      
      this.getCelebrateReq();
      this.isCelebrateAdd = false;
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      // alert('ddddd' + this.userLogin.RoleID)
      // if(this.userLogin.RoleID === "1"){
      //   this.isCelebrateAdd = true;
      //   this.iconName = "add";
      // }else{
      //   this.isCelebrateAdd = false
      // }

      let previtem = navParams.get('item');
     //  alert('previtem' + JSON.stringify(previtem));
      if(previtem != undefined || previtem != null){
        this.updateReq = true;
        this.celeReqId = previtem.ID;
        this.celebrateregister.setValue({
          firstname: previtem.FirstName,
          lastname: previtem.LastName,
          contactnumber: previtem.Contact,
          emailaddress: previtem.Email,
          area: previtem.AreaID,
          occassion: previtem.OccassionID,
          expectedevdate: previtem.DateOfEvent
        });

        this.fname = previtem.FirstName;
        this.lname = previtem.LastName;
        this.contactnumber = previtem.Contact;
        this.emailid = previtem.Email;
        this.areaid = previtem.AreaID;
        this.occassionid = previtem.OccassionID;
        this.expectedevdt = previtem.DateOfEvent;
        // alert('Email' + this.emailid + 'contac'+ this.contactnumber);
      }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CelebratewithusPage');
  }


  getCelebrateReq(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = { };
    //alert('params' + JSON.stringify(params))
    this.apiProvider._postAPI("GetCelebrateRequest", params).subscribe(res => {
      // Get Donars 
      loading.dismiss();
      //alert('GetDonorsResult Data ::'+ JSON.stringify(res));
      if(res.GetCelebrateRequestResult.length >0){
        this.celebrateusData = res.GetCelebrateRequestResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

  edit(item:any){
    this.fname = item.FirstName;
    this.lname = item.LastName;
    this.cnumber = item.Contact;
    this.email = item.Email;
    this.areaid = item.AreaID;
    this.occassionid = item.OccassionID;
    this.expectedevdt = item.DateOfEvent
    this.isCelebrateAdd = false;
    this.requestId = item.ID;
  }

  action(item:any){
    // alert('item' + JSON.stringify(item));
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();  
      let donarparams = 
      {
        "cmd": "3",
        "FirstName": item.FirstName,
        "LastName": item.LastName,
        "EmailID": item.Email,
        "Contact": item.Contact,
        "Date": item.DateOfEvent,
        "VolEmailID": this.userLogin.EmailID,
        "AreaID": item.AreaID,
        "OccassionID": item.OccassionID,
        "ID": item.ID,
        "Prefix":""
      };

      // alert('Update Celebrate Request Params : :' + JSON.stringify(donarparams));
      this.apiProvider._postAPI("ManageCelebrateRequest", donarparams).subscribe(res => {
        // Added Donar 
        // alert('API Data ::'+ JSON.stringify(res));
        if(res.ManageCelebrateRequestResult.length >0){
          this.apiProvider.presentAlert('Alert', 'Celebrate Request Deleted sucessfully.');
          this.getCelebrateReq();
          this.celebrateregister.reset();
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'Error while deleting celebrate request');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
      loading.dismiss();
  }

  registerCelebrateReq(cmdId:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.celebrateregister.valid){     
      let donarparams = 
      {
        "cmd": cmdId,
        "FirstName": this.celebrateregister.value.firstname,
        "LastName": this.celebrateregister.value.lastname,
        "EmailID": this.celebrateregister.value.emailaddress,
        "Contact": this.celebrateregister.value.contactnumber,
        "Date": this.celebrateregister.value.expectedevdate,
        "VolEmailID": this.userLogin.EmailID,
        "AreaID": this.celebrateregister.value.area,
        "OccassionID": this.celebrateregister.value.occassion,
        "ID": this.celeReqId,
        "Prefix":""
      };

      // alert('Add Celebrate Request Params : :' + JSON.stringify(donarparams));
      this.apiProvider._postAPI("ManageCelebrateRequest", donarparams).subscribe(res => {
        // Added Donar 
        loading.dismiss();
        // alert('API Data ::'+ JSON.stringify(res));
        if(res.ManageCelebrateRequestResult.length >0){
          if(cmdId == "1"){
            this.apiProvider.presentAlert('Alert', 'Celebrate with us request added sucessfully,');
          }else if(cmdId == "2"){
            this.apiProvider.presentAlert('Alert', 'Celebrate with us Request Updated sucessfully');
            this.navCtrl.pop();
          }          
          this.celebrateregister.reset();
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'Error while adding new Donar');
          loading.dismiss();
        }
      }, (err) => {
        loading.dismiss();
        this.apiProvider.presentAlert('Error', err);        
      });
    }else{
      loading.dismiss();
      this.apiProvider.presentAlert('Error', 'All Fields are mandatory');      
    }
  }

  addcelebratereq(){
    if (this.isCelebrateAdd == false) {
      this.isCelebrateAdd = true;
      this.iconName = "close";
    } else {
      this.isCelebrateAdd = false;
      this.iconName = "add";
    }
  }

  getContacts() { 
    this.contacts.pickContact(
      ).then((contacts) => {
        var contact = {};
        contact["name"]   = contacts.displayName;
        if(contacts.emails != null){
          contact["emails"]   = contacts.emails[0].value;
        }else{
          contact["emails"]   = '';
        }
        contact["number"] = contacts.phoneNumbers[0].value;
        this.fname = contact["name"];
        this.emailid = contact["emails"];
        this.contactnumber = contact["number"];
    }, function(err){
      // alert('Error: ' + err);
      this.api.presentAlert('Error', err);
    });
    
  }

}
