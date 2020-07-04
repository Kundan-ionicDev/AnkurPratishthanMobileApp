import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, PopoverController, AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {SearchLocationPage} from "../search-location/search-location";
import { Chart } from 'chart.js';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner";
import { RestApiProvider } from "../../providers/rest-api/rest-api";
import { MemberdetailsPage } from "../memberdetails/memberdetails";
import { AllbooksPage } from "../allbooks/allbooks";
import { ManageOrphanedetailsPage } from "../manage-orphanedetails/manage-orphanedetails";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/slider/slider1.jpg",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/slider/slider2.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/slider/slider3.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/slider/slider4.jpg",
    }
  ];
  clickedImagePath:any;
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  
  zbarOptions:any;
  scannedResult:any;
  encodeData: any;
  scannedData: {};
  checkdata: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  

  constructor(
    
    public alertCtrl: AlertController,
    public apiProvider: RestApiProvider,
    private barcodeScanner: BarcodeScanner,
    private storage: Storage, 
    public nav: NavController,
    public popoverCtrl: PopoverController) {
      this.encodeData = "https://www.ankurpratishthan.org";
      // Options
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
      this.checkdata = JSON.parse(localStorage.getItem('UserLogin'));
    }
    
  openPage(title,page) {
    // alert('page'+ title);
    // this.apiProvider._selectedtitle = title;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.push(title);
    this.apiProvider._selectedtitle = page;
    this.nav.push(page,{
      'title':title
    });
  }
  
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
    });
  }
 
  encodedText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
        alert(encodedData);
        this.encodeData = encodedData;
    }, (err) => {
        console.log("Error occured : " + err);
    });                 
 }


  ngOnInit() {
    this.reportDetails();
  }

  reportDetails(){
// this.barChart = new Chart(this.barCanvas.nativeElement, {
    //   type: "bar",
    //   data: {
    //     labels: ["Orphan1", "Orphan2", "Orphan3", "Orphan4", "Orphan5"],
    //     datasets: [
    //       {
    //         label: "List of Orphane",
    //         data: [12, 19, 3, 5, 2],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255,99,132,1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });

    // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    //   type: "doughnut",
    //   data: {
    //     labels: ["Available", "Not Available", "Sold", "Lost"],
    //     datasets: [
    //       {
    //         label: "Books Status",
    //         data: [12, 19, 3, 5],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)"
    //         ],
    //         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384"]
    //       }
    //     ]
    //   }
    // });

    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: "line",
    //   data: {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //       {
    //         label: "My First dataset",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: "butt",
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: "miter",
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         spanGaps: false
    //       }
    //     ]
    //   }
    // });
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Kundan Sakpal"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  
  
  // go to result page
  doSearch() {
    // this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
       popover.present({
      ev: myEvent
    });
  }
}

