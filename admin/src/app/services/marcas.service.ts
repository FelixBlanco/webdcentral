import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
  })
};

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(
    private http: HttpClient,
    ) {}

    _getMarcas(){
      return this.http.get(environment.apiHost + '/api/v1/marcas/filter',httpOptions);
    }

}
