import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

/**
 * Generated class for the AddusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addusers',
  templateUrl: 'addusers.html',
})
export class AddusersPage {
  xml:any;
  iconName: string="add";
  isclustadd: boolean = false;
  clustrdata =[
    { Name: 'Sneha Sadan Orphanage Vinayalaya', Address:'Vinayalaya Rd, Gundavali, Andheri East, Mumbai, Maharashtra 400093', ContactNumber : '9876789877', MemberCount : 12, Image:'assets/img/books/ngo.jpeg',Librarian:"Udhav " },
    { Name: 'Sneha Sadan', Address:'5-C, Western Express Hwy, Salsette Parsi Colony, Parsi Colony, Jogeshwari East, Mumbai, Maharashtra 400047', ContactNumber : '022 2687 3694', MemberCount : 5 ,Image:'assets/img/books/ngo1.jpeg', Librarian:"Pranav "},
    { Name: 'Home For The Aged', Address:'Gokul Nandanvan Co-operative Society, Radha Krishna Nagar, Aghadi Nagar, Andheri East, Mumbai, Maharashtra 400047', ContactNumber : '022 2838 2535', MemberCount : 1 ,Image:'assets/img/books/ngo2.jpeg',Librarian:"Kundan " },
    { Name: 'Sishu Bhavan', Address:'Missionaries of Charity - Childrens Orphanage, Station, Church Rd, LIC Colony, Suresh Colony, Vile Parle West, Mumbai, Maharashtra 400056', ContactNumber : '022 2618 4068', MemberCount : 19 ,Image:'assets/img/books/ngo3.jpeg', Librarian:"Siddhesh " },
    { Name: 'Voluntary Organisation In Community Enterprise', Address:'C-2, Gilbert Hall, Triveni, J P Road, Andheri(W), Mumbai, Maharashtra 400058', ContactNumber : '022 2624 4304', MemberCount : 12 ,Image:'assets/img/books/ngo4.jpeg',Librarian:"?" },
  ];

  memberdata =[
    { Name: 'Sneha Sadan Orphanage Vinayalaya', Address:'Vinayalaya Rd, Gundavali, Andheri East, Mumbai, Maharashtra 400093', ContactNumber : '9876789877', MemberCount : 12, Image:'assets/img/books/ngo.jpeg',Librarian:"Udhav " },
    { Name: 'Sneha Sadan', Address:'5-C, Western Express Hwy, Salsette Parsi Colony, Parsi Colony, Jogeshwari East, Mumbai, Maharashtra 400047', ContactNumber : '022 2687 3694', MemberCount : 5 ,Image:'assets/img/books/ngo1.jpeg', Librarian:"Pranav "},
    { Name: 'Home For The Aged', Address:'Gokul Nandanvan Co-operative Society, Radha Krishna Nagar, Aghadi Nagar, Andheri East, Mumbai, Maharashtra 400047', ContactNumber : '022 2838 2535', MemberCount : 1 ,Image:'assets/img/books/ngo2.jpeg',Librarian:"Kundan " },
    { Name: 'Sishu Bhavan', Address:'Missionaries of Charity - Childrens Orphanage, Station, Church Rd, LIC Colony, Suresh Colony, Vile Parle West, Mumbai, Maharashtra 400056', ContactNumber : '022 2618 4068', MemberCount : 19 ,Image:'assets/img/books/ngo3.jpeg', Librarian:"Siddhesh " },
    { Name: 'Voluntary Organisation In Community Enterprise', Address:'C-2, Gilbert Hall, Triveni, J P Road, Andheri(W), Mumbai, Maharashtra 400058', ContactNumber : '022 2624 4304', MemberCount : 12 ,Image:'assets/img/books/ngo4.jpeg',Librarian:"?" },
  ];

  librariabdata =[
    { Name: 'Udhav', Address:'Andheri East, Mumbai, Maharashtra 400093', ContactNumber : '9876789877', MemberCount : 12, Image:'assets/img/avatar.jpeg',EmailId:"Udhav@gmail.com",AlternateNumber:12312113131, DOB:"24-04-1988" },
    { Name: 'Pranav Bhonde', Address:'Jogeshwari East, Mumbai, Maharashtra 400047', ContactNumber : '022 2687 3694', MemberCount : 5 ,Image:'assets/img/logo.png', EmailId:"pranav@gmail.com ",AlternateNumber:12312113131, DOB:"17-03-1991"},
    { Name: 'Pratik parmar', Address:'Aghadi Nagar, Andheri East, Mumbai, Maharashtra 400047', ContactNumber : '022 2838 2535', MemberCount : 1 ,Image:'assets/img/barcode.png',EmailId:"Kundan@gmail.com",AlternateNumber:12312113131, DOB:"11-01-1988" },
    { Name: 'Siddhesh Bhavan', Address:'Vile Parle West, Mumbai, Maharashtra 400056', ContactNumber : '022 2618 4068', MemberCount : 19 ,Image:'assets/img/bg.jpg', EmailId:"Siddhesh@gmail.com",AlternateNumber:12312113131, DOB:"01-02-2004" }
  ];

  clusteradd: FormGroup;
  librariadd: FormGroup;
  memberadd: FormGroup;
  pagetitle: any;
  image: string;
  base64Image: any;
  picture: any;
  photos = [];
  returndata: any;
  finaldata: any;
  roleId: number;

  constructor(
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public apiProvider: RestApiProvider,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {
      // Cluster
     this.clusteradd = this.formBuilder.group({
      fullname: ['',Validators.required],
      emailaddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      address: ['',Validators.required],
      clustercode: ['',Validators.required],
      mobilenumber: ['',Validators.required],
    });

    // Librarian
    this.librariadd = this.formBuilder.group({
      fullname: ['',Validators.required],
      emailaddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      address: ['',Validators.required],
      mobilenumber: ['',Validators.required],
      alternatenumber: ['',Validators.required],
      uid: ['',Validators.required],
      dateofbirth: ['',Validators.required],
    });

    // Member
    this.memberadd = this.formBuilder.group({
      fullname: ['',Validators.required],
      emailaddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      address: ['',Validators.required],
      mobilenumber: ['',Validators.required],
      alternatenumber: ['',Validators.required],
      dateofbirth: ['',Validators.required],
    });
    this.roleId = this.apiProvider.UserRoleId;
    this.pagetitle = this.apiProvider._selectedtitle;
  }

  
  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddusersPage');
  }

  addcategory(){
    if(this.isclustadd == false){
      this.isclustadd = true;
      this.iconName = "close";
    }else{
      this.isclustadd = false;
      this.iconName = "add";
    }
  }

  deletePhoto(index) {
    // this.photos.splice(index, 1);
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
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
    this.camera.getPicture({
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
       destinationType: this.camera.DestinationType.DATA_URL
      }).then((imageData) => {
       // alert('imageData'+ JSON.stringify(imageData));
        this.image = 'data:image/jpeg;base64,'+imageData;
        // alert('image : '+ this.image);
        this.photos.push(
          this.image
        );
        // alert('photos : '+ JSON.stringify(this.photos));
        this.photos.reverse();
        this.picture = imageData;
           }, (err) => {
            this.displayErrorAlert(err);
      });
   }
   
   AccessCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // alert('imageData'+ JSON.stringify(imageData));
      this.image = 'data:image/jpeg;base64,' + imageData;
      // alert('image : '+ this.image);
      this.photos.push(
        this.image
      );
      // alert('photos' + JSON.stringify(this.photos));
      this.photos.reverse();
      }, (err) => {
        this.displayErrorAlert(err);
      });
    
  }

  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
       title: 'Error',
       subTitle: 'Error while trying to capture picture',
       buttons: ['OK']
     });
     alert.present();
  }

  register(){
    if(this.clusteradd.valid){
      this.addcategory()
    }else{
      alert('invalid');
    }
  }

  detailSelected(item:any){
    this.navCtrl.push('ManageOrphanedetailsPage');
  }

 
  xmlToJson(xml) {
	
    // Create the return object
    var obj = {};
  
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj [attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
  
    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };



  scanQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(barcodeData.text, "application/xml");
      this.returndata = this.xmlToJson(xml);
      this.finaldata = this.returndata.PrintLetterBarcodeData;
      if(this.finaldata.length >0){
        this.librariadd = this.formBuilder.group({
          fullname: [this.finaldata.name,Validators.required],
          emailaddress: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
          address: [this.finaldata.house + ' ' + this.finaldata.street + ' ' + this.finaldata.lm + ' ' + this.finaldata.loc + ' ' + this.finaldata.vtc +' '+ this.finaldata.po + ' ' + this.finaldata.dist + ' ' + this.finaldata.state + ' '+ this.finaldata.pc ,Validators.required],
          mobilenumber: ['',Validators.required],
          alternatenumber: ['',Validators.required],
          uid : [this.finaldata.uid, Validators.required],
          dateofbirth: [this.finaldata.dob,Validators.required],
        });
      }
        

     }).catch(err => {
         alert('Please scan adhar card...');
     });
  }
}
