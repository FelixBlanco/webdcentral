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
export class ForgetService {

  constructor(
    private http: HttpClient 
  ) { }

  _newForget(data:any){
    return this.http.post('http://localhost:8000/api/v1/reestablecerClave',data);
  }
}
