import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  token:any =  localStorage.getItem('token');
  dataUser:any;
  constructor(private http: HttpClient) {}

  ingresarLogin(data:any){
    return this.http.post(`${environment.apiHost}/api/auth/login`,data,httpOptions);
  }

  _getAuthUser(){
    return this.http.get(`${environment.apiHost}/api/auth/getUser/`,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      })
    });
  }

  _salirLogin(){
    return this.http.get(`${environment.apiHost}/api/auth/logout`,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      })
    });
  }

  buscarSuscripcionBy(email:string): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${environment.apiHost}/api/v1/buscarSuscripcionPorEmail/${email}`, {observe: 'response'});
  }
  
  forgetPassword(email:any){
    return this.http.post(`${environment.apiHost}/api/v1/reestablecerClave`,{email:email});
  }
  
  changePassword(password:any){
    return this.http.post(`${environment.apiHost}/api/auth/change-password`,{password:password},{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      })
    });
  }
  
}
