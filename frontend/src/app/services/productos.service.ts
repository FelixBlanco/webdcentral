import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

    _getProductos(){
      return this.http.get(`${environment.apiHost}/api/v1/getAllProductos`)
    }

    getDestacados(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/obtenerDestacados`, {observe: 'response'}) as Observable<HttpResponse<any>>;          
    }
}
