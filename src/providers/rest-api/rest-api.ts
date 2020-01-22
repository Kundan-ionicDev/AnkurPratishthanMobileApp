import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Observable, of  } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class RestApiProvider {
  public UserRoleId: number;
  public _selectedtitle:any;

  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  public _devapiURL = "https://services-dev-us.squarepanda.com/";
  extractData: (value: ArrayBuffer, index: number) => unknown;
  constructor(
    private http: HttpClient, 
    private plt: Platform

  ) { }
 
   // Calling POST Method's 
   _postAPI(methodname:string, params: any): Observable<any> {
     //  localStorage.setItem('access_token','');
      return this.http.post<any>("",params, 
        { observe: 'response' }).pipe(
        tap(_ => 
          this.log(methodname)),
          catchError(
            
           this.handleError('login', [])
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
