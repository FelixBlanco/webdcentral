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
export class SeccionesPaginaService {

  constructor(
    private http: HttpClient,
    
    ) {  }

  getSeccionesPagina(){
    return this.http.get(environment.apiHost + '/api/v1/secciones-paginas',httpOptions);
  }
}
