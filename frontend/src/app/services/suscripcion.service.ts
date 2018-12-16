import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http:HttpClient) { }

  _addSus(email:any){ 
    return this.http.post(`${environment.apiHost}/api/v1/nuevaSus`,{email:email});
  }
}
