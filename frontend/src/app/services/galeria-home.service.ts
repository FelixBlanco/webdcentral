import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class GaleriaHomeService {
  
  constructor(
    private http:HttpClient
  ) { }
  
  _addSlideHome(data:any){
    return this.http.post('http://localhost:8000/api/auth/createSlides',data,httpOptions);
  }

}
