import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';


/* const httpOptions = {
    "header" = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'))
}; */
@Injectable({
  providedIn: 'root'
})
export class TurnosService {
    turnoNewBehaviorSource: BehaviorSubject<any> = new BehaviorSubject(null);
    isNewAdded: Observable<any> = this.turnoNewBehaviorSource.asObservable();
    
    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
  constructor(private http: HttpClient) {}

  persist(body: any): Observable<HttpResponse<any>> {
     const httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post<any>(`${environment.apiHost}/api/auth/addTurno`, body, { headers: httpOptions, observe: 'response' });
    }
  getTurnos(body: any): Observable<HttpResponse<any>> {
    const httpOptions: HttpHeaders = new HttpHeaders({  // coloco el header aqui para actualizar el token
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
        return this.http.get<any>(`${environment.apiHost}/api/auth/listarTodoslosTurnos`, { headers: httpOptions, observe: 'response' });
    }
    updateSource(data: boolean){
     console.log(data);
        this.turnoNewBehaviorSource.next(data);   

    }
   /*  updateStatus(id: number, status: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${environment.apiHost}/api/auth/cambiarStatusGaleria/${id}`, { fk_idStatusSistema: status }, { headers: this.httpOptions, observe: 'response' });
    } */
    updateStatus(body: any): Observable<HttpResponse<any>> {
        console.log("body.idTurnos desde el servicio",body.idTurnos);
        return this.http.post<any>(`${environment.apiHost}/api/auth/editTurno/${body.idTurnos}`, body, { headers: this.httpOptions, observe: 'response' });
    }
}