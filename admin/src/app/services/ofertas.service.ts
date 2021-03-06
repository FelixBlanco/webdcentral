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
export class OfertasService {

  

  constructor(
    private http: HttpClient,
    
    ) {  }

    _getOfertas(){
      return this.http.get(environment.apiHost + '/api/v1/ofertas',httpOptions);
    }

    _addOfertas(data:any){
      return this.http.post(environment.apiHost + '/api/v1/ofertas',data,httpOptions);
    }

    _showOferta(id:number){
      return this.http.get(environment.apiHost + '/api/v1/ofertas/'+ id,httpOptions);
    }

    _upgradeOferta(id:number,data:any){
      return this.http.put(environment.apiHost + '/api/v1/ofertas/'+id,data,httpOptions);
    }

    _deleteOfertas(id:number){
      return this.http.delete(environment.apiHost + '/api/v1/ofertas/1',httpOptions);
    }
}
