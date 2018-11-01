import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConfigHome } from '../models/config-home'
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
export class ConfigHomeService {
  
  public _GB: GlobalD;

  constructor( 
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

   _getConfigHome(){
    return this.http.get(this._GB.API + '/api/v1/config-home',httpOptions);
   }

   _upgradeConfigHome(data:any){
    return this.http.post(this._GB.API + '/api/v1/upgrade_config_home',data);
  }
}
