import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  

  constructor(
    private http: HttpClient,
    
    ) {  }

  _getDestacados(){
    return this.http.get(environment.apiHost + '/api/v1/obtenerDestacados',httpOptions);
  }

  _getOrdenes(){
    return this.http.get('http://127.0.0.1:8888/webdcentral/backend/public/api/v1/order/all/trafic',httpOptions);
  }

  _addDestacados(data:any){
    return this.http.post(environment.apiHost + '/api/v1/crearDestacado',data,httpOptions);
  }

  _editDestacados(id:number, data:any){
    return this.http.put(environment.apiHost + '/api/v1/editarDestacado/'+id,data,httpOptions);
  }

  _deleteDestacados(id:number){
    return this.http.delete(environment.apiHost + '/api/v1/eliminarDestacado/'+id,httpOptions);
  }
}
