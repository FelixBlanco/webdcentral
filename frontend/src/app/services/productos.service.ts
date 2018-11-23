import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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

export interface PedidoHeader{
  Codigo_Postal: string;
  Domicilio_Entrega: string;
  Email_Cliente: string;
  Estado_Pedido: string;
  Fecha_Pedido: string;
  Numero_Pedido: number;
  comentaryClient: string;
  created_at: string;
  fk_idStateOrder: number;
  fk_idUserClient: number;
  fk_idUserDriver: number;
  idOrderHeader: number;
  stars: string;
  updated_at: string;
}

export interface CarouselItem{
  id: number;
  products: Producto[];

}
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productosSearchSource: BehaviorSubject<SearchBody> = new BehaviorSubject(null);
  productosSearchItems: Observable<SearchBody> = this.productosSearchSource.asObservable();

  productosFilterTittleSource: BehaviorSubject<string> = new BehaviorSubject(null);
  productosFilterTittle: Observable<string> = this.productosFilterTittleSource.asObservable();

  headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { }

    _getProductos(){
      return this.http.get(`${environment.apiHost}/api/v1/getAllProductos`)
    }

    getDestacados(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/obtenerDestacados`, {observe: 'response'});          
    }

    getMasVendido(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/loMasVendido`, {observe: 'response'});          
    }


    search(searchValue: string): Observable<HttpResponse<SearchBody>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/buscarGeneral/${searchValue}`,{observe: 'response'});
    }

    filter3Pack(filterValues: {rubro?: string, SubRubro1?: string; SubRubro2?: string}): Observable<HttpResponse<{productos: Producto[]}>>{
      return this.http.post<any>(`${environment.apiHost}/api/v1/filtro3pack`,filterValues,{observe: 'response'});
    }

    getUserHistory(userId: string):Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/historialVentas/${userId}`, {observe: 'response'});
    }

    getById(id):Observable<HttpResponse<Producto>>{
      return this.http.get<Producto>(`${environment.apiHost}/api/v1/producto/listarPorid/${id}`, {observe: 'response'});      
    }

    orderHeader(data: any):Observable<HttpResponse<any>>{
      this.headers = new HttpHeaders()
        .append("Authorization", `Bearer ${localStorage.getItem('access_token')}`)
        .append("Content-Type", `application/x-www-form-urlencoded`)

      return this.http.post<any>(`${environment.apiHost}/api/auth/añadirOrderHeader`, data , {headers: this.headers, observe: 'response'});      
    }

    orderBody(data: any, id: number):Observable<HttpResponse<{ OB: PedidoHeader, msj: string}>>{
      this.headers = new HttpHeaders()
        .append("Authorization", `Bearer ${localStorage.getItem('access_token')}`)

      return this.http.post<{ OB: PedidoHeader, msj: string}>(`${environment.apiHost}/api/auth/añadirOrderBody/${id}`, data , {headers: this.headers, observe: 'response'});      
    }

    getByMarca(marca: string):Observable<HttpResponse<Producto[]>>{
      return this.http.get<Producto[]>(`${environment.apiHost}/api/v1/buscar/prod/porMarcas/${marca}`, {observe: 'response'});      
    }
  
}
