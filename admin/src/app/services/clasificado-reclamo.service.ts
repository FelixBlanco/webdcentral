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
export class ClasificadoReclamoService {

  constructor(
    private http: HttpClient,   
  ) { }

  // Obtener todos los  Clasificados de reclamos
  _getClasificadosReclamos(data:any){
    return this.http.get(environment.apiHost + '/api/auth/listarClasificadoReclamo',httpOptions);
  }
  //agregragar clasificados de reclamos
  _addClasificadosReclamos(data:any){
    return this.http.post(environment.apiHost + '/api/auth/addClasificadoReclamo',data,httpOptions);
  }  
  // eliminar clasificados de reclamos
  _deleteClasificadosReclamos(id:number){
    return this.http.delete(environment.apiHost + '/api/auth/borrarClasificadoReclamo/'+id,httpOptions);
  }
  // actualizar un clasificado de reclamo
  _actualizarClasificadoReclamo(id:number,data:any){
    return this.http.post(environment.apiHost + '/api/auth/editClasificadoReclamo/'+id,data,httpOptions);
  }
}
