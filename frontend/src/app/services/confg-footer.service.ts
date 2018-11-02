import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigFooter } from '../models/config-footer'; 
import { GlobalD } from '../global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ConfgFooterService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  _getConfigFooter(){
    return this.http.get(this._GB.API + '/api/v1/config-footer',httpOptions);
  }

  _upgradeConfigFooter(data:ConfigFooter){
    return this.http.post(this._GB.API + '/api/v1/update-config-footer',data,httpOptions);
  }
}
