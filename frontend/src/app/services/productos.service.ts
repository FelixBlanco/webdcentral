import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

    _getProductos(){
      return this.http.get('http://localhost:8000/api/v1/getAllProductos')
    }

    getDestacados(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`http://localhost:8000/api/v1/obtenerDestacados`, {observe: 'response'}) as Observable<HttpResponse<any>>;          
    }
}
