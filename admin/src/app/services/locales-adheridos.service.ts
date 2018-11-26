import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class LocalesAdheridosService {

  constructor(
    private http: HttpClient,
    
    ) {  }

  _listarLocales(data:any){
    return this.http.post(environment.apiHost + '/api/auth/listarLocalAdheridos',data,httpOptions);
  }

  _listarLocalesPorId(data:any){
    return this.http.post(environment.apiHost + '/api/auth/listarPorIdLocalAdheridos',data,httpOptions);
  }
  
  saveLocalAdherido(data:any){
    return this.http.post(environment.apiHost + '/api/auth/guardarLocalAdherido',data,httpOptions);
  }

  _upgradeLocal(id:number,data:any){
    return this.http.post(environment.apiHost + '/api/auth/editarLocalAdheridos/'+id,data,httpOptions);
  }

  _deleteLocal(id:number){
    return this.http.delete(environment.apiHost + '/api/auth/borrarLocalAdheridos/'+id,httpOptions);
  }

}
