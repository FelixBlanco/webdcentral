import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ClasificadosService {

  constructor(private http: HttpClient) {}

  listaPorNumero(nro:number){
    return this.http.get(`${environment.apiHost}/api/v1/lista-por-nro/${nro}`,httpOptions);
  }
}
