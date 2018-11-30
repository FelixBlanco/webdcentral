import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Turno {
    idGaleriaHomeProducto;
    titulo;
    estatus;
    set_imagen: String;
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
export class TurnoService {

    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
    constructor(private http: HttpClient) { }

    getAll(): Observable<HttpResponse<{ galeria: Turno[] }>> {       
        return this.http.get<{ galeria: Turno[] }>(`${environment.apiHost}/api/v1/getGaleria/producto`, { headers: this.httpOptions, observe: 'response' });
    }

    persist(body: any): Observable<HttpResponse<any>> {
        console.log("httpOptions");
        console.log(this.httpOptions);
        console.log("environment");
        console.log(environment.apiHost);
        console.log("body");
        console.log(body);
        return this.http.post<any>(`${environment.apiHost}/api/auth/addTurno`, body, { headers: this.httpOptions, observe: 'response' });
    }

    updateStatus(id: number, status: number): Observable<HttpResponse<any>> {
        return this.http.put<any>(`${environment.apiHost}/api/auth/cambiarStatusGaleria/${id}`, { fk_idStatusSistema: status }, { headers: this.httpOptions, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${environment.apiHost}/api/auth/borrraGaleriaHomeProd/${id}`, { headers: this.httpOptions, observe: 'response' });
    }

}
