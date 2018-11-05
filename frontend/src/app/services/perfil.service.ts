import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private http:HttpClient
  ) { }

  
  _upgradeInfoPerfil(data:any){
    return this.http.put(`${environment.apiHost}/api/v1/user/1`,data);
  }

  _upgradePerfil(data:any){
    return this.http.post(`${environment.apiHost}/api/v1/upgrade-foto-perfil`,data)
  }
}
