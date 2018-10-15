import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GaleriaHomeService {
  
  constructor(
    private http:HttpClient
  ) { }
  
  _addSlideHome(data:any){
    return this.http.post('http://localhost:8000/api/auth/galeriaHome',{data});
  }

}
