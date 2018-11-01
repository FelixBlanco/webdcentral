import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

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

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  _getColor(){
    return this.http.get(this._GB.API +'/api/auth/colores',httpOptions);
  }
  
  _paletaColor(){
    /* Esta paleta de colores se ubican en el landing */
    return this.http.get(this._GB.API +'/api/v1/paleta-color',httpOptions)
  }

  addColores(data:any){
    return this.http.post(this._GB.API +'/api/auth/colores',data,httpOptions);
  }

  deleteColores(id:number){
    return this.http.delete(this._GB.API +'/api/auth/colores/'+id,httpOptions);
  }
}
