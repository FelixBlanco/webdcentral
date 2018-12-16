import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDescuentosService {
  httpOptions: any;

  constructor(private http: HttpClient){
      this.httpOptions = {
          headers: new HttpHeaders({
              'Accept':  'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
          }),
          observe: 'response'  
      };
  }

  getTipoDescuentos(){
    return this.http.get(`${environment.apiHost}/api/v1/tipo-descuentos`, this.httpOptions);
  }
}
