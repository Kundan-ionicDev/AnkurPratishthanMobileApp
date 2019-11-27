import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

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

  constructor(
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

    this.pagetitle = this.apiProvider._selectedtitle;
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddusersPage');
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
}
