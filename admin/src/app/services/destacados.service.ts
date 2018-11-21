import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+ localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DestacadosService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  _getDestacados(){
    return this.http.get(this._GB.API +'/api/v1/obtenerDestacados',httpOptions);
  }

  _getOrdenes(){
    return this.http.get('http://127.0.0.1:8888/webdcentral/backend/public/api/v1/order/all/trafic',httpOptions);
  }

  _addDestacados(data:any){
    return this.http.post(this._GB.API +'/api/v1/crearDestacado',data,httpOptions);
  }

  _editDestacados(id:number, data:any){
    return this.http.put(this._GB.API +'/api/v1/editarDestacado/'+id,data,httpOptions);
  }

  _deleteDestacados(id:number){
    return this.http.delete(this._GB.API +'/api/v1/eliminarDestacado/'+id,httpOptions);
  }
}
