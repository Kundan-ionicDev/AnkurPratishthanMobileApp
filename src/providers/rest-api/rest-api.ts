import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';
declare var cordova: any;

@Injectable()
export class RestApiProvider {
  public UserRoleId: number;
  public _selectedtitle:any;

  //------- API Resource( Method Names) -----------------------------------------------------------------------------
  public _UserLogin:string ="UserLogin"; //---------------------------------- POST 
  public _UserLogout:string ="UserLogout"; //-------------------------------- POST
  public _UserRegister:string ="UserRegister"; //---------------------------- POST
  public _ForgotPassword:string ="ForgotPassword"; //------------------------ POST
  public _GetBooks:string ="GetBooks"; //------------------------------------ POST
  public _ManageBooks:string ="ManageBooks"; //------------------------------ POST
  public _ManageCategories:string = "ManageCategories"; //------------------- POST
  public _ManageLanguages:string ="ManageLanguages"; //---------------------- POST 
  public _ManagePublishers:string ="ManagePublishers"; //-------------------- POST
  public _GetClusters:string ="GetClusters"; //------------------------------ POST
  public _ManageClusters:string ="ManageClusters"; //------------------------ POST
  public _GetLibrarians:string ="GetLibrarians"; //-------------------------- POST
  public _GetRequests:string ="GetRequests"; //------------------------------ POST
  public _ManageLibrarians:string ="ManageLibrarians"; //-------------------- POST
  public _ManageMembers: string ="ManageMembers"; //------------------------- POST
  public _ManageRequests: string ="ManageRequests"; //----------------------- POST
  public _ValidateOTP: string ="ValidateOTP"; //----------------------------- POST
  public _SendOTPEmail: string ="SendOTPEmail"; //--------------------------- POST
  public _GetBooksData : string ="GetBooksData"; //-------------------------- POST
  //------- End of API Resource -------------------------------------------------------------------------------------

  httpOptions = {
      headers: new HttpHeaders({  
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    })
  };

  public booksData :any;
  public _apiURL ="https://ankurpratishthan.com/APService.svc/";
  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private network: Network
  ) { 
        
  }
 
  // Calling POST Method's 
  _postAPI(methodname:string, params: any): Observable<any> {
    return this.http.post<any>(this._apiURL+methodname,params,  this.httpOptions).pipe(
      tap(_ => 
        this.log(methodname)
        ),
        catchError(
         this.handleError(methodname, [])
        )
    );
  }

    // Calling GET Method's
    _getAPI(methodname:string, apiVersion: any): Observable<any> {
      return this.http.get<any>("",this.httpOptions).pipe(
        tap(_ => this.log(methodname)),
        catchError(this.handleError('login', []))
      );
    }

    authenticateUser(params:any,methodname:any){
      return new Promise((resolve,reject) => {
        cordova.plugin.http.post(this._apiURL + methodname, 
        params,  {
            'Content-Type': 'application/json'
          }, (res) => {
            resolve(res.data);
        }, function(err) {
            alert('JSON.stringify(err)' + JSON.stringify(err))
            reject(JSON.stringify(err));
        });
      })  
    }

  // Error Handling
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // alert('Error :'+ JSON.stringify(error.status + ' '+ error.statusText) + JSON.stringify(error) + error.error.error); // log to console instead
      //  this.globVarible.httpErrorcode = error.status + ' '+ error.statusText + ' '+ error.error.error;
      // let errormsg ={
      //   'Status':error.status,
      //   'statusText':error.statusText
      // };
      //this.presentAlert('Error', error.status + ' '+ error.statusText)
      // localStorage.setItem('HttpResponse',JSON.stringify(errormsg));
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Service message with the MessageService */
  private log(message: string) {
    console.log(message);
    // this.presentAlert('API Error', message);
  }

  presentAlert(title,subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK'],
      enableBackdropDismiss : false
    });
    alert.present();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

}
