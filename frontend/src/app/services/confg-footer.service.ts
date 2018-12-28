import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ConfigFooter } from '../models/config-footer'; 
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {}

  _getConfigFooter(){
    return this.http.get(`${environment.apiHost}/api/v1/config-footer`,httpOptions);
  }

  _upgradeConfigFooter(data:any){
    return this.http.post(`${environment.apiHost}/api/v1/update-config-footer`,data,httpOptions);
  }
}
