import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface GaleryProduct {
    idGaleriaHomeProducto;
    titulo;
    imagen;
    set_imagen:String;
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
export class GaleryProductService {

    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
    constructor(private http: HttpClient) {}

    getAll(): Observable<HttpResponse<{galeria: GaleryProduct[]}>> {
        return this.http.get<{galeria: GaleryProduct[]}>(`${environment.apiHost}/api/v1/getGaleria/producto`, {headers: this.httpOptions, observe: 'response'});
    }
    
    persist(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/auth/crearGaleriaHomeProd`, body, {headers: this.httpOptions, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${environment.apiHost}/api/auth/borrraGaleriaHomeProd/${id}`, {headers: this.httpOptions, observe: 'response'});
    }

}
