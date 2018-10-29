import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConfigFooter } from '../models/config-footer'; 

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

  constructor(
    private http: HttpClient
  ) { }

  _getConfigFooter(){
    return this.http.get('http://localhost:8000/api/v1/config-footer',httpOptions);
  }

  _upgradeConfigFooter(data:ConfigFooter){
    return this.http.post('http://localhost:8000/api/v1/update-config-footer',data,httpOptions);
  }
}
