import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

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
  
  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }
  
  _addSlideHome(data:any){
    return this.http.post(this._GB.API +'/api/auth/createSlides',data,httpOptions);
  }

  _getSlideHome(){
    return this.http.get(this._GB.API +'/api/v1/getSlides');
  }

  _deleteSlideHome(id:number){
    return this.http.delete(this._GB.API +'/api/auth/destroySlides/'+id,httpOptions)
  }

}
