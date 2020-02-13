import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class RestApiProvider {
  public UserRoleId: number;
  public _selectedtitle:any;

  //------- API Resource( Method Names) ---------------------------------------------
  public _UserLogin:string ="UserLogin"; //------------------------------------------- POST 
  public _UserLogout:string ="UserLogout"; //-------------------------------- POST
  public _UserRegister:string ="UserRegister"; //-------------------------------- POST
  public _ForgotPassword:string ="ForgotPassword"; //---------------------------------------- POST
  public _GetBooks:string ="GetBooks"; //--------------------------------------- POST
  public _ManageBooks:string ="ManageBooks"; //---------------------------------------- GET
  public _ManageCategories:string = "ManageCategories"; //------------------------------------ GET for searching specific based on Id eg : users/3340174
  public _ManageLanguages:string ="ManageLanguages"; //---------------------------------------- POST eg. users/3340174 
  public _ManagePublishers:string ="ManagePublishers"; //---------------------------------- POST
  public _GetClusters:string ="GetClusters"; //-------------------------------- POST
  public _ManageClusters:string ="ManageClusters"; //---------------------------- POST
  public _GetLibrarians:string ="GetLibrarians"; //---------------------- POST
  public _GetRequests:string ="GetRequests"; //--------------- POST
  public _ManageLibrarians:string ="ManageLibrarians"; //--------------------- POST
  public _ManageMembers: string ="ManageMembers"; //----------------------------------------- GET
  public _ManageRequests: string ="ManageRequests"; //------- GET
  //------- End of API Resource ---------------------------------------
  
  httpOptions = {
      headers: new HttpHeaders({
        // 'Host':'ankurpratishthan.com',    
        // 'Origin':'https://ankurpratishthan.com/',    
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        // 'Access-Control-Request-Headers': "Content-Type",
        // 'Access-Control-Request-Method': 'POST'
        // 'Accept': 'application/json'
        // 'Access-Control-Allow-Origin':'https://ec2-3-6-173-252.ap-south-1.compute.amazonaws.com:8443',
        // 'Access-Control-Allow-Methods':'POST',
        // 'Access-Control-Allow-Headers':'headers',
        // 'Access-Control-Allow-Credentials':'false'
    })
  };


  // public _apiURL = "http://ec2-3-6-173-252.ap-south-1.compute.amazonaws.com/APService.svc/";
  public _apiURL ="https://ankurpratishthan.com/APService.svc/";
  // public _apiURL = "https://admin-abe-dev.squarepanda.com/admin/v1/";
  constructor(
    private http: HttpClient
  ) { }
 
  // Calling POST Method's 
  _postAPI(methodname:string, params: any): Observable<any> {
    return this.http.post<any>(this._apiURL+methodname,params,  this.httpOptions).pipe(
      tap(_ => 
        this.log(methodname)),
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
  }


}
