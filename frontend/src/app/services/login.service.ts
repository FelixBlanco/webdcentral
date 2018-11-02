import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

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
  public _GB: GlobalD;
  constructor(
    private http: HttpClient ,
    public GB: GlobalD
    ) { this._GB = GB; }

  ingresarLogin(data:any){
    return this.http.post(this._GB.API + '/api/auth/login',data,httpOptions);
  }

  _getAuthUser(){
    return this.http.get(this._GB.API + '/api/auth/getUser/',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  _salirLogin(){
    return this.http.get(this._GB.API + '/api/auth/logout',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }
  
}
