import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Producto{
  idProducto: number;
  nombre: string;
  titulo: string;
  urlImage: string;
  promocion: string;
  codeProdSys: string;
  kiloProdcuto: string;
  SubRubro1: string;
  SubRubro2: string;
  precioL1: string;
  precioL2: string;
  precioL3: string;
  precioL4: string;
  precioL5: string;
  precioL6: string;
  precioL7: string;
  precioL8: string;
  precioL9: string;
  rubro: string;
  marca: string;
  fk_idSatate: number;
  destacado: any;
  isOutstanding: number;
  fechaIsOutstanding: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  cantidad?: number;
}

export interface SearchBody{
  msj?: string;
  mascotas: Producto[]; 
  marcas: Producto[]; 
  nombre: Producto[];
}
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

    search(searchValue: string): Observable<HttpResponse<SearchBody>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/buscarGeneral/${encodeURI(searchValue)}`,{observe: 'response'});
    }
}
