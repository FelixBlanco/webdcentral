import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


/* const httpOptions = {
    "header" = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'))
}; */
@Injectable({
  providedIn: 'root'
})
export class TurnosService {
    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
  constructor(private http: HttpClient) {}

  persist(body: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${environment.apiHost}/api/auth/addTurno`, body, { headers: this.httpOptions, observe: 'response' });
    }
  getTurnos(body: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/auth/listarTodoslosTurnos`, { headers: this.httpOptions, observe: 'response' });
    }
}