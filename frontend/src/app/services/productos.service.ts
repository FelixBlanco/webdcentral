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
  defaultPrice: number;
  defaultPrice2:number;
  listAgrupacion:Array<any>,
  Agrupacion:string,
  volumenToSort:number,
  Valoracion_Fabricante:any,
  stockActual:number,
  isFavorite:boolean
}

export interface SearchBody{
  msj?: string;
  mascotas: Producto[]; 
  marcas: Producto[]; 
  nombre: Producto[];
}



export interface CarouselItem{
  id: number;
  products?: Producto[];
  items?: any;
}
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productosSearchSource: BehaviorSubject<SearchBody> = new BehaviorSubject(null);
  productosSearchItems: Observable<SearchBody> = this.productosSearchSource.asObservable();

  productosFilterTittleSource: BehaviorSubject<string> = new BehaviorSubject(null);
  productosFilterTittle: Observable<string> = this.productosFilterTittleSource.asObservable();

  viewSource: BehaviorSubject<boolean> = new BehaviorSubject(null);
  view: Observable<boolean> = this.viewSource.asObservable();
  headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { }
    updateView(view:boolean){
      this.viewSource.next(view);
    }
    _getProductos(){
      return this.http.get(`${environment.apiHost}/api/v1/getAllProductos`)
    }

    getDestacados(): Observable<HttpResponse<any>>{
      return this.http.get<any>(`${environment.apiHost}/api/v1/obtenerDestacados`, {observe: 'response'});          
    }

    getMasVendido(): Observable<HttpResponse<Producto[]>>{
      return this.http.get<Producto[]>(`${environment.apiHost}/api/v1/loMasVendido`, {observe: 'response'});          
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
        .append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      return this.http.post<any>(`${environment.apiHost}/api/auth/añadirOrderHeader`, data , {headers: this.headers, observe: 'response'});      
    }

    orderBody(data: any, id: number):Observable<HttpResponse<any>>{
      this.headers = new HttpHeaders()
        .append("Authorization", `Bearer ${localStorage.getItem('token')}`); 

      return this.http.post<any>(`${environment.apiHost}/api/auth/añadirOrderBody/${id}`, {items: data} , {headers: this.headers, observe: 'response'});      
    }

    getByMarca(marca: string):Observable<HttpResponse<Producto[]>>{
      return this.http.get<Producto[]>(`${environment.apiHost}/api/v1/buscar/prod/porMarcas/${marca}`, {observe: 'response'});      
    }
  
    _getArbolProductos(){
      
      return this.http.get('http://depocentral.dyndns.org:8753/api/v1/getArbolProductos')
      // return this.http.get(`${environment.apiHost}/api/v1/getArbolProductos`)
    }

}
