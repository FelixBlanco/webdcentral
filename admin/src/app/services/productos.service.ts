import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  

  constructor(
    private http: HttpClient,
    
    ) {  }

    _getProductos(){
      return this.http.get(environment.apiHost +'/api/v1/getAllProductos')
    }
}
