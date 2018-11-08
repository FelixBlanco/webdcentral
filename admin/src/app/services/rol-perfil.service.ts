import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RolPerfilService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  getPerfil(){
    return this.http.get(this._GB.API +'/api/v1/perfiles');
  }
}
