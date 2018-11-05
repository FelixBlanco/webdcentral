import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class GaleriaHomeService {

  constructor(private http:HttpClient) {}
  
  _addSlideHome(data:any){
    console.log(data)
    return this.http.post(`${environment.apiHost}/api/auth/createSlides`,data,httpOptions);
  }

  _getSlideHome(){
    return this.http.get(`${environment.apiHost}/api/v1/getSlides`);
  }

}
