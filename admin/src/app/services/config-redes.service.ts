import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigRedesService {

  httpOptions:any; 
  
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


  _getRed(){
    return this.http.get(`${environment.API_URL}/api/v1/get-redes`);
  }

  _addRed(data:any){
    return this.http.post(`${environment.API_URL}/api/auth/crearRedSocial`,data,this.httpOptions);
  }

  _updateRed(data:any,id:number){
    return this.http.put(`${environment.API_URL}/api/auth/updateRedesSociales/`+id,data,this.httpOptions);
  }

}
