import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Contacts } from '@ionic-native/contacts';
import { DatePicker } from '@ionic-native/date-picker';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { ViewDonorsreceiptPage } from '../view-donorsreceipt/view-donorsreceipt';
import { Keyboard } from 'ionic-angular';

/**
 * Generated class for the AcceptpayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acceptpay',
  templateUrl: 'acceptpay.html',
})
export class AcceptpayPage {
  private list: string[] = [ 'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Ecuador',
  'French Guiana',
  'Guyana',
  'Paraguay',
  'Peru',
  'Suriname',
  'Uruguay',
  'Venezuela'];
public input: string = '';
public countries: string[] = [];

  iconName: string = "add";
  isDonarAdd: boolean = true;
  memberadd: FormGroup;
  donarsData: any;
  name: any;
  email: any;
  mobile: any;
  userLogin: any;
  n_array : any;
  value: any;
  amountinword: string;
  pan: any;
  updateReq: boolean = false;
  DonorId: any="";
  viewdonorreceipt : boolean = false;
  amount: any;
  referenceno: any;
  methodname: string;
  cmd: any;
  prefix: any;
  term: any;
  searchText: any;
  constructor(
    private keyboard: Keyboard,
    public loadingCtrl: LoadingController,
    private contacts: Contacts,
    private datePicker: DatePicker,
    public navCtrl: NavController,
    private formBuilder: FormBuilder, 
    public apiProvider: RestApiProvider,
    public platform: Platform,
    public navParams: NavParams) {
      //let id = navParams.get('id');
      let item = navParams.get('item');
      this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      this.getDonors();
      // Member
      this.memberadd = this.formBuilder.group({
        Prefix: ['', Validators.required],
        donatedby: ['', Validators.required],
        inthenameof: ['', Validators.required],
        emailaddress: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        dateofbirth: ['', Validators.required],
        address: ['', Validators.required],
        mobilenumber: ['', Validators.required],
        panNUmber: [''],
        amountinfigure : ['', Validators.required],
        amountinword: ['', Validators.required],
        donationtowards: ['', Validators.required], 
        paymentmode : ['', Validators.required],
        referenceno: ['', Validators.required],
      });

      if(item != undefined || item != null){
        this.updateReq = true;
        this.DonorId = item.DonorID;
        this.memberadd.setValue({
          Prefix : item.Prefix,
          donatedby: item.FullName,
          inthenameof: item.Inthenameof,
          emailaddress: item.EmailID,
          dateofbirth: item.DOB,
          address: item.Address,
          mobilenumber: item.ContactNo,
          panNUmber: item.PAN,
          amountinfigure : item.Amount,
          amountinword: item.Amountinwords,
          donationtowards: item.DonationTowards, 
          paymentmode : item.PaymentMode,
          referenceno: item.Description,
        });
        this.prefix = item.Prefix
        this.name = item.FullName;
        this.amount = item.Amount;
        this.amountinword = item.Amountinwords;
        this.referenceno = item.Description;
        this.pan = item.PAN;
        this.email = item.EmailID
        this.mobile = item.ContactNo
        this.DonorId = item.DonorID
      }
  }

  add(item: any) {
    //alert('Item::' + JSON.stringify(item));
    this.input = item.FullName;
    this.memberadd.setValue({
      Prefix : item.Prefix,
      donatedby: item.FullName,
      inthenameof: item.Inthenameof,
      emailaddress: item.EmailID,
      dateofbirth: item.DOB,
      address: item.Address,
      mobilenumber: item.ContactNo,
      panNUmber: item.PAN,
      amountinfigure : item.Amount,
      amountinword: item.Amountinwords,
      donationtowards: item.DonationTowards, 
      paymentmode : item.PaymentMode,
      referenceno: item.Description,
    })
    this.countries = [];
  }

  removeFocus() {
    this.keyboard.close();
  }

  search() {
    if (!this.input.trim().length || !this.keyboard.isOpen()) {
      this.countries = [];
      return;
    }    
    this.countries = this.donarsData.filter(item => item.FullName.toUpperCase().includes(this.input.toUpperCase()));
   
    //this.countries = this.donarsData.filter(item => item.toUpperCase().includes(this.input.toUpperCase()));
  }

  ionViewCanLeave() {
    // alert('ionViewCanLeave')
    // this.platform.ready().then(() => {
    //   alert('canGoBack000')
    //   document.addEventListener('backbutton', () => {
    //    if (this.navCtrl.canGoBack()) {
    //      alert('canGoBack')
    //      this.platform.exitApp()
    //      return;
    //    }
    //    alert('canGoBack111')
    //    this.navCtrl.pop()
    //  }, false);
    //   });

  }

  
  getamountToword(figure:any){
    this.amountinword = this.convertNumberToWords(figure);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptpayPage');
  }

  onchange(){
    this.pan.toLocalUpperCase();
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

  clearData(){
    this.memberadd.reset();
  }

  getDonors(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {"EmailID":this.userLogin.EmailID,"RoleID":this.userLogin.RoleID};
    this.apiProvider._postAPI("GetDonors", params).subscribe(res => {
      // Get Donars 
      // alert('GetDonorsResult Data ::'+ JSON.stringify(res));
      if(res.GetDonorsResult.length >0){
        this.donarsData = res.GetDonorsResult;
        // alert('donarsData' + JSON.stringify(this.donarsData));
        loading.dismiss();
      }
    }, (err) => {
      this.apiProvider.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

  // cmdId     :-- 1 == cmd insert, 2 == cmd update, 3 == cmd delete
  // IsSavedTP :-- 0 == Permanent, 1 == Temporary save
  manageDonorReq(cmdId:any,IsSavedTP:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.memberadd.valid){     
      let donarparams = 
      {
        "FullName": this.memberadd.value.donatedby,
        "Inthenameof": this.memberadd.value.inthenameof,
        "EmailID": this.memberadd.value.emailaddress,
        "ContactNo": this.memberadd.value.mobilenumber,
        "DOB": this.memberadd.value.dateofbirth,
        "Address": this.memberadd.value.address,
        "Amount": this.memberadd.value.amountinfigure,
        "PaymentMode": this.memberadd.value.paymentmode,
        "AdminEmailID": this.userLogin.EmailID,
        "DonationTowards": this.memberadd.value.donationtowards,
        "PAN":this.memberadd.value.panNUmber,
        "Amount1":this.memberadd.value.amountinword,
        "Description":this.memberadd.value.referenceno,
        "cmd":cmdId, // 1 == Insert, 2 == Update and 3 == Delete
        "DonorID": this.DonorId,
        "Tempflag": IsSavedTP, // 1 == Temporary Save and 0 == Permanent
        "Prefix":this.memberadd.value.Prefix,
      };

     // alert('Add Donar Params : :' + JSON.stringify(donarparams));
      this.apiProvider._postAPI('ManageDonor', donarparams).subscribe(res => {
       // alert('resposne : :' + JSON.stringify(res));
        // Added Donar 
        loading.dismiss();
        // alert('API Data ::'+ JSON.stringify(res));
        if(res.ManageDonorResult.length >0){
          if(cmdId == 1 && IsSavedTP == 0){
            this.apiProvider.presentAlert('Alert','Donor Request Submitted to Admin.');
            this.memberadd.reset();
          }else if(cmdId == 1 && IsSavedTP == 1){
            this.apiProvider.presentAlert('Alert','Donor Request is Saved Temporary.');
            this.memberadd.reset();
          }else if(cmdId == 2 && IsSavedTP == 1){
            this.apiProvider.presentAlert('Alert','Donor Request is Updated Temporary.');
            this.memberadd.reset();
            this.navCtrl.pop();
          }else{
            this.apiProvider.presentAlert('Alert','Please try again.');
          }       
          loading.dismiss();
        }else{
          this.apiProvider.presentAlert('Alert', 'Error while adding new Donar');
          loading.dismiss();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
    }else{
      this.apiProvider.presentAlert('Error', 'All fields are mandatory');
      loading.dismiss();
    }
  }


  viewReceipt(){
    this.navCtrl.push(ViewDonorsreceiptPage, {
      item: this.memberadd.value
    });
  }

  addvolunteer() {
    if (this.isDonarAdd == false) {
      this.isDonarAdd = true;
      this.iconName = "close";
    } else {
      this.isDonarAdd = false;
      this.iconName = "add";
    }
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        this.n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            this.n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (this.n_array[i] == 1) {
                    this.n_array[j] = 10 + parseInt(this.n_array[j]);
                    this.n_array[i] = 0;
                }
            }
        }
        
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                this.value = this.n_array[i] * 10;
            } else {
                this.value = this.n_array[i];
            }
            if (this.value != 0) {
                words_string += words[this.value] + " ";
            }
            if ((i == 1 && this.value != 0) || (i == 0 && this.value != 0 && this.n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && this.value != 0) || (i == 2 && this.value != 0 && this.n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && this.value != 0) || (i == 4 && this.value != 0 && this.n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && this.value != 0 && (this.n_array[i + 1] != 0 && this.n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && this.value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
  }
}
