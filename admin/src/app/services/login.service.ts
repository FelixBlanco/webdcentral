import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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

  constructor(
    private http: HttpClient
  ) { }

  ingresarLogin(data:any){
    return this.http.post('http://localhost:8000/api/auth/login',data,httpOptions);
  }

  _getAuthUser(){
    return this.http.get('http://localhost:8000/api/auth/getUser/',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  _salirLogin(){
    return this.http.get('http://localhost:8000/api/auth/logout',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }
  
}
