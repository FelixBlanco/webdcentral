import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {

  constructor(private http: HttpClient) {}

  _newForget(data:any){
    return this.http.post(`${environment.apiHost}/api/v1/reestablecerClave`,data);
  }
}
