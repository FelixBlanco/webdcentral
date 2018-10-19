import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigColorService {

  constructor(
    private http:HttpClient,
  ) { }

  _getColor(){
    return this.http.get('http://localhost:8000/api/auth/colores',httpOptions);
  }

  addColores(data:any){
    return this.http.post('http://localhost:8000/api/auth/colores',data,httpOptions);
  }
}
