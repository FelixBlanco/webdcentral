import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  //http://127.0.0.1:8000/api/auth/listarPorIdClasificado/1
  getClasificadosId(id:number){
   // const   header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };
  return this.http.get(environment.apiHost+'/api/auth/listarPorIdClasificado/'+ id,httpOptions);

}
}
