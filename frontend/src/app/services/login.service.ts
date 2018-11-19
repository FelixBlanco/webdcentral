import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  
  token:any =  localStorage.getItem('access_token');
  dataUser:any;
  constructor(private http: HttpClient) {}

  ingresarLogin(data:any){
    return this.http.post(`${environment.apiHost}/api/auth/login`,data,httpOptions);
  }

  _getAuthUser(){
    return this.http.get(`${environment.apiHost}/api/auth/getUser/`,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }

  _salirLogin(){
    return this.http.get(`${environment.apiHost}/api/auth/logout`,{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
  }
  
}
