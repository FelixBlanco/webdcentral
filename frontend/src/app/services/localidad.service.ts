import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LocalidadService {

    constructor(private http: HttpClient){}

    getAll():Observable<HttpResponse<any[]>>{
        return this.http.get<any[]>(`${environment.apiHost}/api/v1/cost/delivery`, { observe: 'response'});      
    }
}