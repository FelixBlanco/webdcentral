import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasVendidoService {

  constructor(
    private http: HttpClient,
    private masVendidoService: MasVendidoService
  ) { }

  getMasVendido(){
    return this.http.get(`${environment.apiHost}/api/v1/loMasVendido`);
  }
}
