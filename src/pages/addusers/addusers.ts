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
  clustrdata :any;

  memberdata : any;

  librariabdata : any;

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
    public api: RestApiProvider,
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
      librarianId : ['',Validators.required],
      members : ['',Validators.required],
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
    this.initialize();
  }

  initialize(){
    if(this.pagetitle == 'Cluster Management'){
      this.api._postAPI('GetClusters', '').subscribe(res => {
        // Clusters list
        if (res.GetClustersResult.length > 0) {
          this.clustrdata = res.GetClustersResult;
        } else {
          alert('No data available.')
        }
      }, (err) => {
        alert('Error:' + err);
      });
    }else if(this.pagetitle == 'Librarian Management'){
      this.api._postAPI('GetLibrarians', '').subscribe(res => {
        // Get Librarians
        if (res.GetLibrariansResult.length > 0) {
          this.librariabdata = res.GetLibrariansResult;
        } else {
          alert('No data available.')
        }
      }, (err) => {
        alert('Error:' + err);
      });
    }else if(this.pagetitle == 'Member Management'){
      this.api._postAPI('GetMembers', '').subscribe(res => {
        // Get Members
        if (res.GetMembersResult.length > 0) {
          this.memberdata = res.GetMembersResult;
        } else {
          alert('No data available.')
        }
      }, (err) => {
        alert('Error:' + err);
      });
    }
    
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

  register(id:any){
    // Add New Cluster 
    if(id == 1){
      if(this.clusteradd.valid){
        let params = {
          "ClusterName": this.clusteradd.value.fullname,
          "ClusterCode": this.clusteradd.value.clustercode,
          "EmailID": this.clusteradd.value.emailaddress,
          "Address": this.clusteradd.value.address,
          "MobileNo": this.clusteradd.value.mobilenumber,
          "LibEmailID": this.clusteradd.value.librarianId,
          "Members": this.clusteradd.value.members,
          "AdminEmailID": 'kundansakpal@gmail.com',
          "cmd": "1",
          "ClusterID": "8"
        };
        this.api._postAPI('ManageClusters', params).subscribe(res => {
          alert('Added new cluster');
        }, (err) => {
          alert('Error:' + err);
        });
      }else{
        alert('All fields are mandatory');
      }
    }
    // Add new Librarian
    else if(id == 2){
      if(this.librariadd.valid){
        let params = {
          "cmd": "1",
          "FirstName": "Test2Librarian2",
          "LastName": "TestLibrarian2",
          "EmailID": "TestLib2@test.com",
          "Address": "santacruz",
          "MobileNo": "9876",
          "AltMobileNo": "12345",
          "ClusterID": "1",
          "AdminEmailID": "kundansakpal@gmail.com",
          "LibrarianID": ""
        };
        this.api._postAPI('ManageLibrarians', params).subscribe(res => {
          alert('Added New Librarian');
        }, (err) => {
          alert('Error:' + err);
        });
      }else{
        alert('All fields are mandatory');
      }
    }
    // Add New Member
    else if(id == 3){
      if(this.memberadd.valid){
        let params = {
          "cmd": "1",
          "FirstName": "",
          "LastName": "",
          "EmailID": "",
          "Address": "",
          "MobileNo": "",
          "AltMobileNo": "",
          "ClusterID": "2",
          "DOB": "6-11-2020",
          "AdminEmailID": "kundansakpal@gmail.com",
          "MemberID": "7"
        };
        this.api._postAPI('ManageMembers', params).subscribe(res => {
          alert('Added New Member');
        }, (err) => {
          alert('Error:' + err);
        }); 
      }else{
        alert('All fields are mandatory');
      }
    }
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
