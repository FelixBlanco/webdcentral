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

  
}
