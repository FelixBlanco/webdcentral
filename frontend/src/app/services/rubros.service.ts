import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class RubrosService {
    
  constructor(
    private http: HttpClient
  ) { }

    getRubros(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/rubro/filter`, {observe: 'response'});
    }

    getSubrubroA(byRubro: string){
      return this.http.get<any>(`${environment.apiHost}/api/v1/rubro/listarSubrubro1/${byRubro}`, {observe: 'response'});
    }

    getSubrubroB(bySubRubroA: string){
      return this.http.get<any>(`${environment.apiHost}/api/v1/rubro/listarSubrubro2/${bySubRubroA}`, {observe: 'response'});
    }
}