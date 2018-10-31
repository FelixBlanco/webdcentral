import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalD } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

    _getProductos(){
      return this.http.get(this._GB.API + '/api/v1/getAllProductos')
    }
}
