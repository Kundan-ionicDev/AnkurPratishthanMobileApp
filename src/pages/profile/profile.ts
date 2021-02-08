import { Component, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public person: {name: string, company: string, birthdate?: number};
  dob: any;
  age: any;
  showProfile: boolean;
  editView: boolean;
  userLogin: any;
  volunteradd: FormGroup;
  image: string="";
  photos = [];
  picture = [];
  imagePath : any ="data:image/jpeg;base64,";
  
  img: string;
  private _anEmitter: EventEmitter< any >;
  startDate: string;
  minDate: string;
  maxDate: string;
  loginData: { EmailID: any; FullName: any; FirstName: any; LastName: any; RoleID: any; Address: any; ContactNo: any; DOB: any; LoginID: any; Img: string; };

  constructor(
    public events : Events,
    public apiProvider: RestApiProvider,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public api: RestApiProvider,
    private camera: Camera,
    public alertCtrl : AlertController,
    public formBuilder : FormBuilder,
    public navCtrl: NavController, 
    public changeDetector: ChangeDetectorRef,
    public navParams: NavParams) {
      // this.startDate = new Date().toISOString(); 
      // this.minDate = new Date().toISOString();
      // this.maxDate = new Date().toISOString();

      var MyDate = new Date();
      var MyDateString;
      MyDate.setDate(MyDate.getDate() + 1);
      MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2) ;

      this.startDate = MyDateString; 
      this.minDate = MyDateString; //new Date().toISOString();
      this.maxDate = MyDateString;
      
      // console.log('this.startDate'+ this.startDate + 'Mini:'+ this.minDate + 'Max:'+ this.maxDate);
      
      // this.image = "assets/icon/person.png";
      this.person = {name: undefined, company: undefined, birthdate: undefined};
      this.dob = undefined;
      // this.userLogin = JSON.parse(localStorage.getItem('UserLogin'));
      // this._anEmitter = navParams.data.theEmitter;
      // alert('_anEmitter' + JSON.stringify(this._anEmitter));

      this.userLogin = this.api.userLoggedInData;
      // this.userLogin =  {
      //   "FullName":"kundan",
      //   "EmailID" :"kundan@gmail.com",
      //   "RoleID":"1",
      //   "Img":"assets/icon/MyProfilePic.jpg"
      // };
      this.photos.push(
        { "Image":this.userLogin.Img }
       );

       this.events.subscribe('loginData', (user) => {  
        this.photos = [];
        // alert('user'+ JSON.stringify(user));
        // user and time are the same arguments passed in `events.publish(user, time)`
        // this.Profileimg = user;
        this.changeDetector.detectChanges();
        this.photos.push(
          { "Image":user.Img }
         );
         this.userLogin.Img = user.Img;
         
         this.loginData = {
          "EmailID":user.EmailID,
          "FullName":this.userLogin.FullName,
          "FirstName":user.FirstName,
          "LastName": user.LastName,
          "RoleID":user.RoleID,
          "Address":user.Address,
          "ContactNo":user.ContactNo,
          "DOB":user.DOB,
          "LoginID":user.LoginID,
          "Img": user.Img
        };
        // alert('Profileimg ' + this.Profileimg);
      });

      this.editView = navParams.get('editView');
      // alert('editView' + this.editView);
      this.volunteradd = this.formBuilder.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        emailaddress: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        dateofbirth: ['', Validators.required],
        address: ['', Validators.required],
        mobilenumber: ['', Validators.required]
      });

      this.volunteradd.setValue({
        fname : this.userLogin.FirstName,
        lname : this.userLogin.LastName,
        emailaddress : this.userLogin.EmailID,
        dateofbirth : this.userLogin.DOB,
        address : this.userLogin.Address,
        mobilenumber : this.userLogin.ContactNo
      });
      // alert('Data :'+ JSON.stringify(this.volunteradd.value));
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
  }

  changeProfilepic(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Profile Photo',
      buttons: [
        {
          text: 'Gallery',
          role: 'destructive',
          handler: () => {
            this.AccessGallery();
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.AccessCamera();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }); 
    actionSheet.present();
  }


  deletePhoto(index) {
    // this.photos.splice(index, 1);
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete this photo?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
  confirm.present();
   }

   
  AccessGallery(){
    this.photos =[];
      this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL
       }).then((imageData) => {
         // alert('imageData'+ JSON.stringify(imageData));
         // this.image = 'data:image/jpeg;base64,'+imageData;
         this.image = imageData;
         //alert('image : '+ JSON.stringify(this.photos));
           this.photos.push(
            { "Image":this.imagePath + this.image }
           );

         //this.photos.reverse();
         this.picture = imageData;
            }, (err) => {
             this.displayErrorAlert(err);
       });
      }
   
   AccessCamera(){
    this.photos =[];
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 200,
        targetHeight: 200
      };
  
      this.camera.getPicture(options).then((imageData) => {
          // alert('imageData'+ JSON.stringify(imageData));
          //this.image = 'data:image/jpeg;base64,' + imageData;
          this.image = imageData;
          //alert('image : '+ JSON.stringify(this.photos));
          this.photos.push(
            { "Image":this.imagePath + this.image }
          );
            // alert('photos length' + JSON.stringify(this.photos.length));
          // this.photos.reverse(); 
        }, (err) => {
          this.displayErrorAlert(err);
      });
  }

  displayErrorAlert(err){
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'Error while trying to capture picture',
       buttons: ['OK']
     });
     alert.present();
  }

  updateProfile(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
      // if(this.volunteradd.valid){
      // if(this.image == undefined){
      //     this.image = this.userLogin.Img
      //   }
      let profileparams = {
        "EmailID": this.volunteradd.value.emailaddress,
        "ContactNo": this.volunteradd.value.mobilenumber,
        "DOB": this.volunteradd.value.dateofbirth,
        "Address": this.volunteradd.value.address,
        "LoginID": this.userLogin.LoginID,
        "FirstName":this.volunteradd.value.fname,
        "LastName":this.volunteradd.value.lname,
        "Img": this.image
      };

      // alert('profile update ::'+ JSON.stringify(profileparams) + this.image + this.maxDate + this.startDate);
      this.api._postAPI("UpdateProfile", profileparams).subscribe(res => {
        //alert('Respnse' + JSON.stringify(res));
        loading.dismiss();
        if(res.UpdateProfileResult.length >0){
          localStorage.clear();
          localStorage.removeItem('UserLogin');
          if(this.image != undefined || this.image !=null){
            this.img = res.UpdateProfileResult[0].ImgPath;
          }else{
            this.img = this.userLogin.Img
          }
          // this._anEmitter.emit('update');

          // alert('image' + this.img + 'Emitted Value' +JSON.stringify(this._anEmitter));
           
          this.loginData = {
            "EmailID":res.UpdateProfileResult[0].EmailID,
            "FullName":this.userLogin.FullName,
            "FirstName":res.UpdateProfileResult[0].FirstName,
            "LastName": res.UpdateProfileResult[0].LastName,
            "RoleID":res.UpdateProfileResult[0].RoleID,
            "Address":res.UpdateProfileResult[0].Address,
            "ContactNo":res.UpdateProfileResult[0].ContactNo,
            "DOB":res.UpdateProfileResult[0].DOB,
            "LoginID":res.UpdateProfileResult[0].LoginID,
            "Img": this.img
          };

          localStorage.setItem('UserLogin',JSON.stringify(this.loginData));
          this.events.publish('loginData', this.loginData);
          this.api.presentAlert('Alert','Profile Updated Sucessfully' );
        }else{
          this.api.presentAlert('Alert','Error while updating profile, please try again later');
        }
      }, (err) => {
        this.apiProvider.presentAlert('Error', err);
        loading.dismiss();
      });
    // }else{
    //   loading.dismiss();
    //   this.api.presentAlert('Alert','All fields are mandatory');      
    // }
    loading.dismissAll();
  }

}
