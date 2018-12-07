import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
    constructor(private http: HttpClient) { }

    persist(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/auth/addTurno`, body, { headers: this.httpOptions, observe: 'response' });
    }

    updateStatus(id: number, status: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${environment.apiHost}/api/auth/cambiarStatusGaleria/${id}`, { fk_idStatusSistema: status }, { headers: this.httpOptions, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        console.log("id desde servicio", id);
        return this.http.delete<any>(`${environment.apiHost}/api/auth/borrarTurno/${id}`, { headers: this.httpOptions, observe: 'response' });
    }
    
    update(body: any): Observable<HttpResponse<any>> {
        console.log("body.idTurnos desde el servicio",body.idTurnos);
        return this.http.post<any>(`${environment.apiHost}/api/auth/editTurno/${body.idTurnos}`, body, { headers: this.httpOptions, observe: 'response' });
    }

    verificarRegistro(body: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/client/ml/byid/${body.nameUser}`, { headers: this.httpOptions, observe: 'response' });
    }

    ingresarRegistro(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/v1/client/ml/add`, body, { headers: this.httpOptions, observe: 'response' });
    }

    modificarRegistro(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/v1/client/ml/update`, body, { headers: this.httpOptions, observe: 'response' });
    }
}
