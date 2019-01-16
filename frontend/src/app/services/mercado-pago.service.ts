import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(
    private http: HttpClient
  ) { }

  getDataPago(data:any): Observable<HttpResponse<any>>{
    const httpOptions: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
  });
    return this.http.post<any>(`${environment.apiHost}/api/auth/get/data/pago`,data,{headers: httpOptions,observe:'response'})
  }
  getDataMercadoPago(data:any): Observable<HttpResponse<any>>{
    const httpOptions: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
  });
    return this.http.post<any>(`${environment.apiHost}/webdcentral/mpago/index.php`,data,{observe:'response'})
  }
}
