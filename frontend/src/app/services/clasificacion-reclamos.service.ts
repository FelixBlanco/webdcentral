import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClasificacionReclamosService {

  constructor(private http: HttpClient) { }

  _getClasificacionReclamos(){
    return this.http.get(`${environment.apiHost}/api/auth/listarClasificadoReclamo`,httpOptions);
  }
  
}
