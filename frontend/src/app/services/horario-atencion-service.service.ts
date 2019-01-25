import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class HorarioAtencionServiceService {

  constructor(private http: HttpClient) {}

  _getHorarios(data:any){
    return this.http.get(environment.apiHost + '/api/auth/horario-atencion/',httpOptions);
  }

  
}
