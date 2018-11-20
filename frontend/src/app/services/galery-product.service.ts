import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GaleryProductService {

    httpOptions;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }),
            observe: 'response'
        };
    }

    getAll(body?: any): Observable<HttpResponse<any>> {
       
        return this.http.get<any>(`${environment.apiHost}/api/v1/getGaleria/producto`, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    getById(id: number): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/v1/getGaleria/${id}`, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    persist(body: any): Observable<HttpResponse<any>> {
        console.log(body);
        return this.http.post<any>(`${environment.apiHost}/api/auth/crearGaleriaHomeProd`, body, this.httpOptions) as Observable<HttpResponse<any>>;
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${environment.apiHost}/api/auth/borrraGaleriaHomeProd/${id}`, this.httpOptions) as Observable<HttpResponse<any>>;
    }

}
