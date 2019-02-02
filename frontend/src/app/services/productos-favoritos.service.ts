

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { Observable ,BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
    
  })
};
export interface productoFavorito{
  fk_idPerfilCliente:number,
  fk_idProducto:number,
  idProductosFavoritos:number,
}


@Injectable({providedIn: 'root'})
export class ProductosFavoritosService {
  productsfavoritesSource: BehaviorSubject<productoFavorito[]> = new BehaviorSubject([]);
    productsFavoritesItems: Observable<productoFavorito[]> = this.productsfavoritesSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

    agregarFavorito(data:any){
      const httpOptions2 = {
        headers: new HttpHeaders({
          'Accept':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
          
        })
      };
      return this.http.post<any>(`${environment.apiHost}/api/auth/agregarProductoFavorito`,data, httpOptions2);
    }

    eliminarFavorito(data: any){
      const httpOptions2 = {
        headers: new HttpHeaders({
          'Accept':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
          
        })
      };
      return this.http.post<any>(`${environment.apiHost}/api/auth/eliminarProductoFavorito`,data,httpOptions2);
    }

    obtenerFavorito(idCliente){
      return this.http.get<any>(`${environment.apiHost}/api/v1/listarProductosFavoritos/${idCliente}`, {observe: 'response'});
    }
    updateFavoritesSource(data:productoFavorito[]){
      this.productsfavoritesSource.next(data);
    }
}