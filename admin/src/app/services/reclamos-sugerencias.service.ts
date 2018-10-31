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
export class ReclamosSugerenciasService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  // Esperando por definicion de rutas
  _getReclamos(){
    return this.http.get(this._GB.API +'/api/auth/sugerencias-reclamos',httpOptions);
  }

  _addReclamos(data:any){
    return this.http.post(this._GB.API +'/api/auth/sugerencias-reclamos',data,httpOptions);
  }

  _upgradeEstatus(id,changeStatus){
    return this.http.put(this._GB.API +'/api/auth/cambiarStatus-sugerencias-reclamos/'+id,{fk_idStatusReclamo:changeStatus},httpOptions);
  }
}
