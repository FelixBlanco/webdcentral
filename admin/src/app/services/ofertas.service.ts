import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
  })
};


@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

    _getOfertas(){
      return this.http.get(this._GB.API +'/api/v1/ofertas',httpOptions);
    }

    _addOfertas(data:any){
      return this.http.post(this._GB.API +'/api/v1/ofertas',data,httpOptions);
    }

    _showOferta(id:number){
      return this.http.get(this._GB.API +'/api/v1/ofertas/'+ id,httpOptions);
    }

    _upgradeOferta(id:number, data:any){
      console.log(data)
      return this.http.put(this._GB.API +'/api/v1/ofertas/'+id,data);
    }
}
