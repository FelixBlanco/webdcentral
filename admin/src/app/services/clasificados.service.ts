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
export class ClasificadosService {

  constructor(
    private http: HttpClient,    
    ) {  }

  _getClasificados(data:any){
    return this.http.post(environment.apiHost + '/api/auth/listarClasificado',data,httpOptions);
  }

  _getPorIdClasificados(id:number){
    return this.http.get(environment.apiHost + '/api/auth/listarPorIdClasificado/'+ id,httpOptions);
  }  

  _addClasificados(data:any){
    return this.http.post(environment.apiHost + '/api/auth/guardarClasificado',data,httpOptions);
  }  

  _editClasificados(id:number,data:any){
    return this.http.post(environment.apiHost + '/api/auth/editarClasificado/'+id,data,httpOptions);
  }
  
  _deleteClasificados(id:number){
    return this.http.delete(environment.apiHost + '/api/auth/borrarClasificado/'+id,httpOptions);
  }  
  
}
