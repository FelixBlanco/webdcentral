import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { GlobalD } from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaHomeService {
  
  public _GB: GlobalD;
  headers: HttpHeaders = new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
  });
  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }
  
  _addSlideHome(data:any): Observable<HttpResponse<any>>{
    return this.http.post<any>(this._GB.API +'/api/auth/createSlides',data,{headers: this.headers, observe:'response'}) as Observable<HttpResponse<any>>;
  }

  _getSlideHome(){
    return this.http.get(this._GB.API +'/api/v1/getSlides');
  }

}
