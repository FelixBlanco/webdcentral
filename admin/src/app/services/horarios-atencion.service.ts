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
export class HorariosAtencionService {

  constructor(
    private http: HttpClient,   
  ) { }

 
  _getHorarios(data:any){
    return this.http.get(environment.apiHost + '/api/auth/horario-atencion/',httpOptions);
  }
  
  _addHorarios(data:any){
    return this.http.post(environment.apiHost + '/api/auth/horario-atencion/',data,httpOptions);
  }  
  _deleteHorarios(data:any){
    return this.http.get(environment.apiHost + '/api/auth/delete-horario-atencion/'+data,httpOptions);
  }
/*   // eliminar clasificados de reclamos
  _deleteClasificadosReclamos(id:number){
    return this.http.delete(environment.apiHost + '/api/auth/borrarClasificadoReclamo/'+id,httpOptions);
  }
  // actualizar un clasificado de reclamo
  _actualizarClasificadoReclamo(id:number,data:any){
    return this.http.post(environment.apiHost + '/api/auth/editClasificadoReclamo/'+id,data,httpOptions);
  } */
}