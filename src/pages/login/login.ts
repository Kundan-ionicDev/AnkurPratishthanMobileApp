import { Directive, Component, ViewChild, Input, HostListener, ElementRef, HostBinding } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController, ModalController, Platform, DateTime, NavParams} from "ionic-angular";
import { RegisterPage } from "../register/register";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Device } from '@ionic-native/device';
import { MainPage } from "../main/main";
// import { DonarDetailComponent } from "../../components/donar-detail/donar-detail";
// import { PrintModalPage } from "../print-modal/print-modal";

import { File } from '@ionic-native/file/ngx';
import { Keyboard } from '@ionic-native/keyboard';
import { FileOpener } from "@ionic-native/file-opener/ngx";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: any;
  loginDat = { email: '', password: ''};
  data: any;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
 
  lostpassword: any = 0;
  user: FormGroup;
  checkemail:FormGroup;
  loginData: any;
  madalDismissData: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder:'',
    inputStyles: {
      'width': '50px',
      'height': '50px',
      'border': 'none',
      'border-bottom': '1px solid grey'
    }
  };
  verifyEmailId:any;
  verifyform: FormGroup;
  @ViewChild('ngOtpInput') ngOtpInputRef:any;
  verifyotp: any;
  isActiveToggleTextPassword: Boolean = true;
  password_type: string = 'password';
  @ViewChild('input') emailInput ;
  startDate: string;
  minDate: any;
  maxDate: string;
  isPasswordchng: any;
  itemselcted: any;


  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 
  pdfObj = null;

  constructor(
    // public datepipes: DatePipe,
    private file: File, 
    private fileOpener: FileOpener,
    private formBuilder: FormBuilder,
    public nav: NavController,
    public api: RestApiProvider,
    public forgotCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public apiProvider: RestApiProvider,
    public loadingCtrl: LoadingController,
    private device: Device,
    public platform: Platform,
    public modalCtrl: ModalController,
    public keyboard: Keyboard,
    public navParams: NavParams,
    private faio: FingerprintAIO) {
      // this.platform.prepareReady();
      // keyboard.disableScroll(true);
      // alert('Current Date::' + this.CurrentDate);
      localStorage.clear();
      localStorage.removeItem('UserLogin');
      // this.menu.swipeEnable(false);
      // this.user = this.formBuilder.group({
      //   emailaddress: new FormControl('ngoankur@gmail.com', Validators.compose([
      //     Validators.required, 
      //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      //   ])),
      //   password: ['admin123',Validators.required]
      // });
      this.user = this.formBuilder.group({
        emailaddress: new FormControl('ngoankur@gmail.com', Validators.compose([
          Validators.required, 
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: ['admin123',Validators.required]
      });
      
      this.checkemail = this.formBuilder.group({
        verifyEmailId: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]))
      });

      this.verifyform = this.formBuilder.group({
        // verifyotp: ['',Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
        confirmPassword: ['', Validators.required],
        verifyEmailId : ['', Validators.required],
      }, {validator: this.matchingPasswords('password', 'confirmPassword') 
      })

      //console.log('navparama' + navParams.get('isPassChng'));
      // Check if password change requested.
     
      if(navParams.get('isPassChng') != undefined){
        this.isPasswordchng = navParams.get('isPassChng');
        if(this.isPasswordchng == true){
          this.lostpassword = 1;
        }
      }
  }


  createPdf() {
    // var docDefinition = {
    //   content: [
    //     { text: 'Print Label Of Donors', style: 'header' },
    //     { text: new Date(), alignment: 'right' },
 
    //     { text: 'Recipient Name', style: 'subheader' },
    //     { text: this.letterObj.from },
 
    //     { text: 'Address', style: 'subheader' },
    //     this.letterObj.to,
 
    //     { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
    //     // {
    //     //   ul: [
    //     //     'Bacon',
    //     //     'Rips',
    //     //     'BBQ',
    //     //   ]
    //     // }
    //   ],
    //   styles: {
    //     header: {
    //       fontSize: 18,
    //       bold: true,
    //     },
    //     subheader: {
    //       fontSize: 14,
    //       bold: true,
    //       margin: [0, 15, 0, 0]
    //     },
    //     story: {
    //       italic: true,
    //       alignment: 'center',
    //       width: '50%',
    //     }
    //   }
    // };

    var headers = {
      fila_0:{
          // col_1:{ text: 'Faltas', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
          // col_2:{ text: 'Fecha', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
          //col_3:{ text: 'Descripción', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
          col_4:{ text: 'Donors Label', style: 'tableHeader',colSpan: 2, alignment: 'center' }
      },
      fila_1:{
          // col_1:{ text: 'Header 1', style: 'tableHeader', alignment: 'center' },
          // col_2:{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, 
           //col_3:{ text: 'Header 3', style: 'tableHeader', alignment: 'center' },
           col_4:{ text: 'Recepient Name:', style: 'tableHeader', alignment: 'center' },
           col_5:{ text: 'Kundan Sakpal', style: 'tableHeader', alignment: 'center'}
      }
  };
  var rows = {
      a: {
          // peaje: '1',
          // ruta: '2',
          // fechaCruce: '3',
          addresslabel: 'Address:',
          contactlabel: '30 Aulike St. Suite 105  Kailua, Hawaii 96734 Phone: (808) 266-1222 Fax: (808) 266-1226'
      },
      b: {
          // peaje: '1',
          // ruta: '2',
          // fechaCruce: '3',
          addresslabel: 'Contact:',
          contactlabel: '9960097184'
      }
  }
  
  var body = [];
  for (var key in headers){
      if (headers.hasOwnProperty(key)){
          var header = headers[key];
          var row = new Array();
          // row.push( header.col_1 );
          // row.push( header.col_2 );
          //row.push( header.col_3 );
          row.push( header.col_4 );
          row.push( header.col_5 );
          body.push(row);
      }
  }
  for (var key in rows) 
  {
      if (rows.hasOwnProperty(key))
      {
          var data = rows[key];
          alert(JSON.stringify(data));
          var row = new Array();
          // row.push( data.peaje.toString() );
          // row.push( data.ruta.toString()  );
          // row.push( data.fechaCruce.toString() );
          row.push( data.addresslabel.toString()  );
          row.push( data.contactlabel.toString() );
          body.push(row);
      }
  }
  
  var docDefinition = {
          pageMargins: [40,155,40,55],
          pageOrientation: 'landscape',
          // header: function() {
          //     return {
          //         margin: 40,
          //         columns: [
          //           {
          //             },
          //             { text:['Resumen disciplinario'], 
          //                     alignment: 'left',bold:true,margin:[-405,80,0,0],fontSize: 24}
          //         ]
          //     }
          // },
          footer: function(currentPage, pageCount) {
              return { text:'Page '+ currentPage.toString() + '  ' + pageCount, alignment: 'center',margin:[0,30,0,0] };
          },
          content: [
              //{ text: 'Tables', style: 'header' },
              //'\nEl estudiante AGRESOTH NEGRETE JORYETH TATIANA - 901 - TARDE tiene 1 actas, con 1 faltas acomuladas y a manera de resumen descritas a continuación:\n\n',
              { text: 'Print the donors label for courier', style: 'sta' },
              '',
              {
                  style: 'tableExample',
                  table: {
                      widths: [ '*', '*', '*', '*', '*' ],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: body
                  }
              }],
          styles: {
              header: {
                  fontSize: 28,
                  bold: true
              },
              subheader: {
                  fontSize: 15,
                  bold: true
              },
              quote: {
                  italics: true
              },
              small: {
                  fontSize: 8
              },
              sta: {
                  fontSize: 11,
                  bold: false,
                  alignment: 'justify'
              }
          }
  };

   // alert('docDefinition' + JSON.stringify(docDefinition));
   
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
    //alert('pdf' + this.pdfObj)
  }
 
  downloadPdf() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
 
  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
  }
  public getType() {
      return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
   }

  // login and go to home page
  async login(userdata) {
    localStorage.clear();
    localStorage.removeItem('UserLogin');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //loading.present();
    
    if(this.user.valid){     
      let loginparams = {
        "EmailID": this.user.value.emailaddress,
        "Password":this.user.value.password,
        "FCM":localStorage.getItem('FCMToken')
      };
      
      this.api._postAPI("APLogin", loginparams).subscribe(res => {
        loading.dismiss();

        if(res.APLoginResult[0].Message =="SUCCESS"){
          this.loginData = {
            "EmailID":res.APLoginResult[0].EmailID,
            "FullName":res.APLoginResult[0].FirstName,// + ' '+ res.APLoginResult[0].LastName,
            "FirstName":res.APLoginResult[0].FirstName,
            "LastName": res.APLoginResult[0].LastName,
            "RoleID":res.APLoginResult[0].RoleID,
            "Address":res.APLoginResult[0].Address,
            "ContactNo":res.APLoginResult[0].ContactNo,
            "DOB": res.APLoginResult[0].DOB,
            "LoginID":res.APLoginResult[0].LoginID,
            "Img": res.APLoginResult[0].ImgPath
          };
          localStorage.setItem('UserLogin',JSON.stringify(this.loginData));
          this.api.userLoggedInData = this.loginData;
          
          loading.dismiss();
          this.nav.insert(0,MainPage);
          // this.nav.insert(0,ReportsPage);
          this.nav.popToRoot();

        }else if(res.APLoginResult[0].Message =="FAILURE"){
          this.apiProvider.presentAlert('Alert','Invalid Login credentials');
        }else {
          this.apiProvider.presentAlert('Alert','Please try again');
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
  

  cancel(){
    this.lostpassword = 0;
  }
    
  forgotPass() {
    this.lostpassword = 1;
  }


  onOtpChange(otp) {   
    // alert('otp'+ otp);
    this.verifyotp = otp;
  }  
  
  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    }
  } 

  checkIfUserExists(){
    // this.lostpassword = 2;
    //alert('verifyEmailId' + this.verifyEmailId);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.checkemail.valid){
      this.verifyEmailId = this.checkemail.value.verifyEmailId;
      let params ={"EmailID": this.checkemail.value.verifyEmailId }
      this.api._postAPI("CheckUser", params).subscribe(res => {
        // Check User exists then send OTP
        loading.dismiss();
        if(res.CheckUserResult[0].Message =="SUCCESS OTP Exists" || 
            res.CheckUserResult[0].Message =="SUCCESS New OTP"){
            this.lostpassword = 2;
            this.apiProvider.presentAlert('Alert','We have sent you the OTP over email, Please enter OTP to change password.')
            // this.register();
        }else{
          this.apiProvider.presentAlert('Alert',res.CheckUserResult[0].Message);
          loading.present();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
    }else{
      loading.present();
      this.apiProvider.presentAlert('Alert','Please Enter valid EmailId');
      
    }
  }

  changepassword(){
    // alert('this.verifyotp' + this.verifyotp);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.verifyform.valid){
      let params ={
        "EmailID":this.verifyEmailId,
        "Password":this.verifyform.value.password,
        "Otp":this.verifyotp
      }
      // alert('verfy password '+ JSON.stringify(params));
      //{"ChangePasswordResult":[{"Message":"SUCCESS"}]
      this.api._postAPI("ChangePassword", params).subscribe(res => {
        // Check User exists then send OTP
        loading.dismiss();
        // alert('res.ChangePasswordResult' + JSON.stringify(res.ChangePasswordResult));
        if(res.ChangePasswordResult[0].Message =="SUCCESS Password change"){
          this.lostpassword = 0;
          this.apiProvider.presentAlert('Alert','Password is reset sucessfully.');
          loading.present();
        }else{
          this.apiProvider.presentAlert('Alert','Error while password reset');
          loading.present();
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
    }else{
      loading.present();
      this.apiProvider.presentAlert('Alert','Verification failed...Please try again');
     
    }
  }
}
 