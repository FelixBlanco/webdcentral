import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DomicilioEntregaService {

    constructor(
    private http: HttpClient
    ) { }

    getAll(idPerfil: string): Observable<HttpResponse<any>>{
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarDomiciliosDeClientes/${idPerfil}`,{observe: 'response'});
    }

    getIdPerfilBy(idUser: string): Observable<HttpResponse<any>>{
        return this.http.get<any>(`${environment.apiHost}/api/v1/retornarIdDelPerfil/${idUser}`,{observe: 'response'});
    }

    persistBy(data): Observable<HttpResponse<any>>{
        return this.http.post<any>(`${environment.apiHost}/api/v1/agregarDomicilio`, data ,{observe: 'response'});
    }
}