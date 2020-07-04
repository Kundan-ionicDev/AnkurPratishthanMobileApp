import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Contacts } from '@ionic-native/contacts';
import { DatePicker } from '@ionic-native/date-picker';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ManagevoluntersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-managevolunters',
  templateUrl: 'managevolunters.html',
})
export class ManagevoluntersPage {
  isVolunteradd: boolean = false;
  iconName: string = "add";
  volunteradd :FormGroup;
  volunteerData :any;
  name: any;
  email: any;
  mobile: any;
  userLogin: any;
  dateTime: any;
  year: number;
  month: number;
  date: number;
  // manageId: string;
  requestId: any="";
  lname: any;
  reqUpdate: boolean= false;
  minDate: string = new Date().toISOString();
  maxData : any = (new Date()).getFullYear() + 3;

  constructor(
    public loadingCtrl: LoadingController,
    private contacts: Contacts,
    private datePicker: DatePicker,
    public navCtrl: NavController, 
    public apiProvider: RestApiProvider, 
    public formBuilder : FormBuilder,
    public navParams: NavParams) {
     // alert('minDate' + this.minDate +"maxData"  + this.maxData)
     // this.manageId = "1";
    // Member
    this.volunteradd = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailaddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      dateofbirth: ['', Validators.required],
      address: ['', Validators.required],
      mobilenumber: ['', Validators.required]
    });
    this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
    // this.userLogin = 
    //   {
    //     "EmailID":"kundansakpal@gmail.com",
    //     "FullName":"Pranav Bhonde",
    //     "RoleID":"1"
    //   };
    this.getVolunteers();
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.date = new Date().getDate();

    // this.dateTime = this.year +'-'+ this.month + '-' + this.date;
    this.dateTime = new Date(),'yyyy-MM-dd';
    // alert('dateTime' + this.dateTime)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagevoluntersPage');
  }

 
  getDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => alert('Got date: '+ date),
      err => alert('Error occurred while getting date: '+ err)
    );
  }

  getVolunteers(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.apiProvider._postAPI("GetVolunteers", {}).subscribe(res => {
      // Get Volunteers Result
      // alert('GetVolunteersResult Data ::'+ JSON.stringify(res));
      if(res.GetVolunteersResult.length >0){
        this.volunteerData = res.GetVolunteersResult;
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
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
        this.name = contact["name"];
        this.email = contact["emails"];
        this.mobile = contact["number"];
    }, function(err){
      // alert('Error: ' + err);
      this.api.presentAlert('Error', err);
    });
    
  }
  
  registerVolunteer(cmdId:any){
    // alert('data' + JSON.stringify(this.volunteradd.value));
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.volunteradd.valid){     
      let addVolunteerparams = 
      {
        "cmd": cmdId,
        "FirstName": this.volunteradd.value.firstname,
        "LastName": this.volunteradd.value.lastname,
        "EmailID": this.volunteradd.value.emailaddress,
        "ContactNo": this.volunteradd.value.mobilenumber,
        "DOB": this.volunteradd.value.dateofbirth,
        "Address": this.volunteradd.value.address,
        "AdminEmailID": this.userLogin.EmailID,
        "Img": "",
        "LoginID": this.requestId
      };
      
      // alert('ManageVolunteer :' + JSON.stringify(addVolunteerparams));
      this.apiProvider._postAPI("ManageVolunteer", addVolunteerparams).subscribe(res => {
        // Added New Volunteer 
        // alert('API Data ::'+ JSON.stringify(res));
        loading.dismiss();
        if(res.ManageVolunteerResult.length >0){
          if(cmdId == "1"){
            this.apiProvider.presentAlert('Alert', 'New Volunteer is registered sucessfully');
            this.getVolunteers();
          }else{
            this.apiProvider.presentAlert('Alert', 'Volunteer details are Updated sucessfully');
            this.getVolunteers();
          }         
          // this.getVolunteers(); 
          this.volunteradd.reset();
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'Please try again');
          this.volunteradd.reset();
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
    }else{
      this.apiProvider.presentAlert('Error', 'All Fields are mandatory');
      loading.dismiss();
    }
  }

  clearData(){
    this.volunteradd.reset();
  }

  addvolunteer(){
    if (this.isVolunteradd == false) {
      this.isVolunteradd = true;
      this.iconName = "close";
    } else {
      this.isVolunteradd = false;
      this.iconName = "add";
    }
  }

  editmember(item:any){
    this.volunteradd.setValue({
      firstname: item.FirstName,
      lastname: item.LastName,
      emailaddress: item.EmailID,
      dateofbirth: item.DOB,
      address: item.Address,
      mobilenumber:item.ContactNo
    });
    // this.manageId = "2";
    this.requestId = item.LoginID;
    // alert('edit'+ JSON.stringify(this.volunteradd.value));
    this.isVolunteradd = true;
    this.iconName = "close";
    this.email = item.EmailID;
    this.name = item.FirstName;
    this.lname = item.LastName;
    this.mobile = item.ContactNo;
    this.reqUpdate = true;
  }

  confirmDelete(item:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present(); 
    let addVolunteerparams = 
    {
      "cmd": "3",
      "FirstName": item.FirstName,
      "LastName": item.LastName,
      "EmailID": item.EmailID,
      "ContactNo": item.ContactNo,
      "DOB": item.DOB,
      "Address": item.Address,
      "AdminEmailID": this.userLogin.EmailID,
      "Img": "",
      "LoginID": item.LoginID
    };
    
    //alert('ManageVolunteer :' + JSON.stringify(addVolunteerparams));
    this.apiProvider._postAPI("ManageVolunteer", addVolunteerparams).subscribe(res => {
      // Added New Volunteer 
      // alert('API Data ::'+ JSON.stringify(res));
      loading.dismiss();
      if(res.ManageVolunteerResult.length >0){
        this.apiProvider.presentAlert('Alert', 'Volunteer deleted sucessfully');
        this.volunteradd.reset();
        this.getVolunteers();
        loading.dismiss();
      }else{
        this.apiProvider.presentAlert('Alert', 'Error while deleting volunteer,Please try again');
        this.volunteradd.reset();
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
  }
}
