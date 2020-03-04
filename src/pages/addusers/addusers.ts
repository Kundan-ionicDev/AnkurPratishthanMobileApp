import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { BookdetailsPage } from '../bookdetails/bookdetails';
import { ManageOrphanedetailsPage } from '../manage-orphanedetails/manage-orphanedetails';
import { ThrowStmt } from '@angular/compiler';
import { MemberdetailsPage } from '../memberdetails/memberdetails';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
import { LibrariandetailsPage } from '../librariandetails/librariandetails';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-addusers',
  templateUrl: 'addusers.html',
})
export class AddusersPage {
  xml: any;
  iconName: string = "add";
  isclustadd: boolean = false;
  clustrdata: any;

  memberdata: any;

  librariabdata: any;

  clusteradd: FormGroup;
  librariadd: FormGroup;
  memberadd: FormGroup;
  pagetitle: any;
  base64Image: any;
 
  image: string;
  photos = [];
  picture = [];

  returndata: any;
  finaldata: any;
  roleId: number;
  logindata: any;

  contactList = [];
  imagePath : any ="data:image/jpeg;base64,";
  name: any;
  email: any;
  mobile: any;

  constructor(
    public api: RestApiProvider,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public apiProvider: RestApiProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    private contacts: Contacts,
    private datePicker: DatePicker,
    public app: App,
    public navParams: NavParams) {
      // this.getContacts();
      this.logindata = JSON.parse(localStorage.getItem('UserLogin'));
      
      // Cluster
      this.clusteradd = this.formBuilder.group({
        fullname: ['', Validators.required],
        emailaddress: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        address: ['', Validators.required],
        clustercode: ['', Validators.required],
        mobilenumber: ['', Validators.required],
        librarianId: ['', Validators.required],
        members: ['', Validators.required],
      });

      // Librarian
      this.librariadd = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        emailaddress: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        dateofbirth: ['', Validators.required],
        address: ['', Validators.required],
        mobilenumber: ['', Validators.required],
        // alternatenumber: ['', Validators.required],
        clusterId: ['', Validators.required],
      });

      // Member
      this.memberadd = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        emailaddress: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        dateofbirth: ['', Validators.required],
        address: ['', Validators.required],
        mobilenumber: ['', Validators.required],
        clusterid: ['', Validators.required]
      });
      this.roleId = this.apiProvider.UserRoleId;
      this.pagetitle = this.apiProvider._selectedtitle;
      this.initialize();
      
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
        // if(contacts.photos != null) {
        //   // console.log(contacts[i].photos);
        //   // contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[0].photos[0].value);
        //    // alert(contact);
        //   } else {
        //   contact["image"] = "assets/dummy-profile-pic.png";
        // }
        // this.contactList.push(contact);
        // alert('contact info' + JSON.stringify(contact) +'Name :-'+ contact["name"]);
        // this.memberadd.value.firstname = contact["name"];
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
    this.librariadd.reset();
    this.clusteradd.reset();
  }

  initialize() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    //if(this.pagetitle == 'Cluster Management'){
    this.api._postAPI('GetClusters', '').subscribe(res => {
      // Clusters list
      if (res.GetClustersResult.length > 0) {
        this.clustrdata = res.GetClustersResult;
      } else {
        // alert('No data available.')
        this.api.presentAlert('Alert', 'No data available.');
      }
    }, (err) => {
      this.api.presentAlert('Error', err);
    });
    //}
    //else if(this.pagetitle == 'Librarian Management'){
    this.api._postAPI('GetLibrarians', '').subscribe(res => {
      // Get Librarians
      if (res.GetLibrariansResult.length > 0) {
        this.librariabdata = res.GetLibrariansResult;
      } else {
        this.api.presentAlert('Alert', 'No data available.');
      }
    }, (err) => {
      this.api.presentAlert('Error', err);
    });
    //}
    //else if(this.pagetitle == 'Member Management'){
    this.api._postAPI('GetMembers', '').subscribe(res => {
      // Get Members
      if (res.GetMembersResult.length > 0) {
        this.memberdata = res.GetMembersResult;
      } else {
        this.api.presentAlert('Alert', 'No data available.');
      }
    }, (err) => {
      this.api.presentAlert('Error', err);
    });
    //}
    loading.dismiss();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddusersPage');
  }

  addcategory() {
    if (this.isclustadd == false) {
      this.isclustadd = true;
      this.iconName = "close";
    } else {
      this.isclustadd = false;
      this.iconName = "add";
    }
  }

  

  deletePhoto(index) {
    // this.photos.splice(index, 1);
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [{
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
      }]
    });
    confirm.present();
  }


  AccessGallery(){
    if(this.photos.length <1){
      this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL
       }).then((imageData) => {
        // alert('imageData'+ JSON.stringify(imageData));
         this.image = imageData;
           // alert('image : '+ this.image);
           this.photos.push(
            { "Image":this.image }
           );
         this.photos.reverse();
         this.picture = imageData;
            }, (err) => {
             this.displayErrorAlert(err);
       });
    }else{
      this.api.presentAlert('Alert','Only single photo is allowed.');
    }
   }
   
   AccessCamera(){
    if(this.photos.length <1){
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
          this.image = imageData;
          // alert('image : '+ this.image);
          this.photos.push(
            { "Image":this.image }
           );
            // alert('photos length' + JSON.stringify(this.photos.length));
          this.photos.reverse(); 
        }, (err) => {
          this.displayErrorAlert(err);
        });
    }else{
      this.api.presentAlert('Alert','Only single photo is allowed.');
    }
  }

  displayErrorAlert(err) {
    // console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }

  register(id: any) {
    // Add New Cluster 
    if (id == 1) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      // alert('clusteradd' + JSON.stringify(this.clusteradd.value) + this.photos[0].Image);
      loading.present();
      if (this.clusteradd.valid) {
        let params = {
          "ClusterName": this.clusteradd.value.fullname,
          "ClusterCode": this.clusteradd.value.clustercode,
          "EmailID": this.clusteradd.value.emailaddress,
          "Address": this.clusteradd.value.address,
          "MobileNo": this.clusteradd.value.mobilenumber,
          "LibrarianID": this.clusteradd.value.librarianId,
          "Members": this.clusteradd.value.members,
          "AdminEmailID": this.logindata.EmailId,
          "cmd": "1",
          "ClusterID": "",
          "Image64":this.photos[0].Image
        };
        // alert('clusteradd ::' + JSON.stringify(params));
        this.api._postAPI('ManageClusters', params).subscribe(res => {
          if(res.ManageClustersResult.length >0){
            this.api.presentAlert('Alert', 'Added new cluster');
            this.clusteradd.reset();
            loading.dismiss();
          }else{
            this.api.presentAlert('Alert', 'Please try again');
            loading.dismiss();
          }
        }, (err) => {
          this.api.presentAlert('Error', err);
          loading.dismiss();
        });
      } else {
        this.api.presentAlert('Error', 'All fields are mandatory');
        loading.dismiss();
      }

    }
    // Add new Librarian
    else if (id == 2) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      // alert('this.librariadd.' + JSON.stringify(this.librariadd.value));
      loading.present();
      if (this.librariadd.valid && this.photos[0].Image.length >0) {
        let params = {
          "cmd": "1",
          "FirstName": this.librariadd.value.firstname,
          "LastName": this.librariadd.value.lastname,
          "EmailID": this.librariadd.value.emailaddress,
          "Address": this.librariadd.value.address,
          "DOB": this.librariadd.value.dateofbirth,
          "MobileNo": this.librariadd.value.mobilenumber,
          "AltMobileNo": '',
          "ClusterID": this.librariadd.value.clusterId,
          "AdminEmailID": this.logindata.EmailId,
          "LibrarianID": "",
          "Image64":this.photos[0].Image
        };
        
        // alert('librariadd ::' + JSON.stringify(params));
        this.api._postAPI('ManageLibrarians', params).subscribe(res => {
         if(res.ManageLibrariansResult.length >0){
          this.api.presentAlert('Alert', 'Added New Librarian');
          this.librariadd.reset();
          loading.dismiss();
         }else{
          this.api.presentAlert('Alert', 'Added New Member');
          loading.dismiss();
         }
        }, (err) => {
          this.api.presentAlert('Error', err);
          loading.dismiss();
        });
      } else {
        this.api.presentAlert('Error', 'All fields are mandatory');
        loading.dismiss();
      }
    }
    // Add New Member
    else if (id == 3) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      if (this.memberadd.valid) {
        let params = {
          "cmd": "1",
          "FirstName": this.memberadd.value.firstname,
          "LastName": this.memberadd.value.lastname,
          "EmailID": this.memberadd.value.emailaddress,
          "Address": this.memberadd.value.address,
          "MobileNo": this.memberadd.value.mobilenumber,
          "AltMobileNo": "",
          "DOB":this.memberadd.value.dateofbirth,
          "ClusterID": this.memberadd.value.clusterid,
          "AdminEmailID": this.logindata.EmailId,
          "MemberID": "",
          "Image64":this.photos[0].Image
        };

        // alert('memberadd ::' + JSON.stringify(params));
        this.api._postAPI('ManageMembers', params).subscribe(res => {
          if(res.ManageMembersResult.length >0){
            this.api.presentAlert('Alert', 'Added New Member');
            this.memberadd.reset();
            loading.dismiss();
          }else{
            this.api.presentAlert('Alert', 'Please try again');
            loading.dismiss();
          }
        }, (err) => {
          this.api.presentAlert('Error', err);
          loading.dismiss();
        });
      } else {
        this.api.presentAlert('Error', 'All fields are mandatory');
        loading.dismiss();
      }
    }
  }

  detailSelected(item: any) {
    this.navCtrl.push('ManageOrphanedetailsPage');
  }


  // Search Filter for Librarian
  filterlibrarian(ev){
      var val = ev.target.value;
      if (val.trim() !== '') 
      {
        this.librariabdata = this.librariabdata.filter((item) => 
        {
          return item.FirstName.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
          item.LastName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.MobileNo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.EmailID.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.Address.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.ClusterName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      }else{
        this.initialize();
      }
  }

  filtermember(ev){
    var val = ev.target.value;
    if (val.trim() !== '') 
    {
      this.memberdata = this.memberdata.filter((item) => 
      {
        return item.FirstName.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
        item.LastName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.Address.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.MobileNo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.EmailID.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.ClusterName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }else{
      this.initialize();
    }
  }

  filtercluster(ev){
    var val = ev.target.value;
    if (val.trim() !== '') 
    {
      this.clustrdata = this.clustrdata.filter((item) => 
      {
        return item.ClusterName.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
        item.MobileNo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.ClusterCode.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.Address.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.ClusterName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }else{
      this.initialize();
    }
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
          obj[attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
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

  //Confirm Delete button :- id == 2 librarian ,id 3 == cluster, and id == 4 member
  async confirmDelete(itemData: any,id:any) {
    // alert('clusterDetail' + JSON.stringify(clusterDetail.ClusterID));
    const alert = await this.alertCtrl.create({
      title: 'Do you really want to delete ?!',
      message: '',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          if(id == 2){
            this.deleteLibrarianDetails(itemData);
          }else if(id == 3){
            this.deleteClusterDetails(itemData);
          }else if ( id == 4){
            this.deleteMemberDetails(itemData);
          }
          
        }
      }]
    });
    await alert.present();
  }

  deleteLibrarianDetails(itemData:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {
      "cmd": "3",
      "FirstName": itemData.FirstName,
      "LastName": itemData.LastName,
      "EmailID": itemData.EmailID,
      "Address": itemData.Address,
      "MobileNo": itemData.MobileNo,
      "AltMobileNo": '',
      "ClusterID": itemData.ClusterID,
      "AdminEmailID": this.logindata.EmailId,
      "LibrarianID": itemData.LibrarianID
    };
    
    // alert('librariadd ::' + JSON.stringify(params));
    this.api._postAPI('ManageLibrarians', params).subscribe(res => {
     if(res.ManageLibrariansResult.length >0){
      this.api.presentAlert('Alert', 'Librarian Deleted Sucessfully...');
      this.initialize();
      loading.dismiss();
     }else{
      this.api.presentAlert('Error', 'Please try again');
      loading.dismiss();
     }
    }, (err) => {
      this.api.presentAlert('Error', err);
      loading.dismiss();
    });
    loading.dismiss();
  }

  deleteMemberDetails(itemData:any){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {
      "cmd": "3",
      "FirstName": itemData.firstname,
      "LastName": itemData.lastname,
      "EmailID": itemData.emailaddress,
      "Address": itemData.address,
      "MobileNo": itemData.mobilenumber,
      "AltMobileNo": "",
      "ClusterID": itemData.clusterid,
      "AdminEmailID":this.logindata.EmailId,
      "MemberID": itemData.MemberID
    };

    // alert('memberadd ::' + JSON.stringify(params));
    this.api._postAPI('ManageMembers', params).subscribe(res => {
      if(res.ManageMembersResult.length >0){
        this.api.presentAlert('Alert', 'Member Deleted Sucessfully...');
        this.initialize();
        loading.dismiss();
      }else{
        this.api.presentAlert('Error', 'Please try again');
        loading.dismiss();
      }
    }, (err) => {
      this.api.presentAlert('Error', err);
      loading.dismiss();
    });
  }

  deleteClusterDetails(clusterDetail: any) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let params = {
      "ClusterName": clusterDetail.ClusterName,
      "ClusterCode": clusterDetail.ClusterCode,
      "EmailID": clusterDetail.Email,
      "Address": clusterDetail.Address,
      "MobileNo": clusterDetail.MobileNo,
      "LibEmailID": clusterDetail.LibrarianID,
      "Members": clusterDetail.Members,
      "AdminEmailID": this.logindata.EmailId,
      "cmd": "3",
      "ClusterID": clusterDetail.ClusterID
    };

    this.api._postAPI("ManageClusters", params).subscribe(res => {
      // alert('ManageClustersResult ::'+ JSON.stringify(res.ManageClustersResult));
      if (res.ManageClustersResult.length > 0) {
        this.api.presentAlert('Alert!', 'Cluster Deleted sucessfully.');
        this.initialize();
        loading.dismiss();
      } else {
        this.api.presentAlert('Error', res.ManageClustersResult.Message)
        loading.dismiss();
      }
    }, (err) => {
      this.api.presentAlert('Error', err);
    });
  }

  editmember(item:any) {
    let nav = this.app.getRootNav();
    nav.setRoot(MemberdetailsPage, {
      memberData: item
    });
  }

  editCluster(item:any) {
    let nav = this.app.getRootNav();
    nav.setRoot(ManageOrphanedetailsPage, {
      clusterData: item
    });
  }

  editlibrarian(item:any){
    let nav = this.app.getRootNav();
    nav.setRoot(LibrariandetailsPage, {
      librariabData: item
    });
  }

  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(barcodeData.text, "application/xml");
      this.returndata = this.xmlToJson(xml);
      this.finaldata = this.returndata.PrintLetterBarcodeData;
      if (this.finaldata.length > 0) {
        this.librariadd = this.formBuilder.group({
          fullname: [this.finaldata.name, Validators.required],
          emailaddress: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
          address: [this.finaldata.house + ' ' + this.finaldata.street + ' ' + this.finaldata.lm + ' ' + this.finaldata.loc + ' ' + this.finaldata.vtc + ' ' + this.finaldata.po + ' ' + this.finaldata.dist + ' ' + this.finaldata.state + ' ' + this.finaldata.pc, Validators.required],
          mobilenumber: ['', Validators.required],
          alternatenumber: ['', Validators.required],
          uid: [this.finaldata.uid, Validators.required],
          dateofbirth: [this.finaldata.dob, Validators.required],
        });
      }
    }).catch(err => {
      this.api.presentAlert('Alert', 'Please scan adhar card...');
    });
  }


  async confirmDailNumber(itemNumber: any) {
    // alert('clusterDetail' + JSON.stringify(clusterDetail.ClusterID));
    const alert = await this.alertCtrl.create({
      title: 'Do you want call ?!',
      message: '',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.dailCallNumber(itemNumber);
        }
      }]
    });
    await alert.present();
  }

  dailCallNumber(number:any){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));  
  }

  openGooglemap(address:any,name:any){
    let label = encodeURI(name);
    window.open('geo:0,0?q=' + address + '(' + label + ')', '_system');
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
}
