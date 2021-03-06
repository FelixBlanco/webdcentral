import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Cupon {
    idCoupons: number; 
    fk_idProducto: string; 
    title: string; 
    description: string; 
    imagen: string; 
    codeCoupns: string;
    dateExpired: string;
    set_imagen: string;
    tipo_descuento: string;
    base_cond: string;
}

@Injectable({
    providedIn: 'root'
})
export class CuponesService {

    httpOptions: any;

    constructor(private http: HttpClient){
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
            }),
            observe: 'response'  
        };
    }

    getAllBy(filter?: any): Observable<HttpResponse<any>>{
        return this.http.post<void>(`${environment.apiHost}/api/auth/cupons/filter`,filter, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    getAll(): Observable<HttpResponse<{cupones: Cupon[]}>>{
        return this.http.get<void>(`${environment.apiHost}/api/auth/listarTodosCupones`, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    getOne(id: number):  Observable<HttpResponse<any>>{
        return this.http.get<void>(`${environment.apiHost}/api/auth/cupons/${id}`, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    delete(id: number): Observable<HttpResponse<any>>{
        return this.http.delete<void>(`${environment.apiHost}/api/auth/borrarCupons/${id}`, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    persist(data: any): Observable<HttpResponse<any>>{//TODO
        return this.http.post<void>(`${environment.apiHost}/api/auth/cupons`, data, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    update(data:any, id: number): Observable<HttpResponse<any>>{
        return this.http.post<void>(`${environment.apiHost}/api/auth/updateCupon/${id}`, data, this.httpOptions) as Observable<HttpResponse<any>>;
    }
}