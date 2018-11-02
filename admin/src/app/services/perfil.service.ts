import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalD } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  
  _upgradeInfoPerfil(data:any){
    return this.http.put(this._GB.API +'/api/v1/user/1',data);
  }

  _upgradePerfil(data:any){
    return this.http.post(this._GB.API +'/api/v1/upgrade-foto-perfil',data)
  }
}
