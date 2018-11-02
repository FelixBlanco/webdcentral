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
export class ForgetService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  _newForget(data:any){
    return this.http.post(this._GB.API +'/api/v1/reestablecerClave',data);
  }
}
