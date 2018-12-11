import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface EstatusTurno {
    idStatusTurnos;
    descripcion;
    created_at;
    updated_at;
    deleted_at;
    fk_idStatusSistema;
    statu: Status;
}
export interface Status {
    idStatusSistema;
    descripcion;
    created_a;
    updated_at;
    deleted_at;
}
@Injectable({
    providedIn: 'root'
})
export class EstatusTurnoService {

    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
    constructor(private http: HttpClient) { }

    getAll(): Observable<HttpResponse<{ estatus: EstatusTurno[] }>> {
        return this.http.get<{ estatus: EstatusTurno[] }>(`${environment.apiHost}/api/v1/listarTodoslosEstatusTurnos`, { headers: this.httpOptions, observe: 'response' });
    }

    // getAll(): Observable<HttpResponse<{ turnos: Turno[] }>> {
    //     return this.http.get<{ turnos: Turno[] }>(`${environment.apiHost}/api/auth/listarTodoslosTurnos`, { headers: this.httpOptions, observe: 'response' });
    // }
    
}
