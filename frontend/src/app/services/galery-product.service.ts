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
    statu: any;
    idMarca:string
  }
  
@Injectable({
    providedIn: 'root'
})
export class GaleryProductService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<HttpResponse<{galeria: GaleryProduct[]}>> {
        return this.http.get<{galeria: GaleryProduct[]}>(`${environment.apiHost}/api/v1/getGaleria/producto`, { observe: 'response'});
    }

}
