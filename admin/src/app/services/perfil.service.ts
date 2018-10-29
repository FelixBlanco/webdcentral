import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private http:HttpClient
  ) { }

  
  _upgradeInfoPerfil(data:any){
    return this.http.put('http://localhost:8000/api/v1/user/1',data);
  }

  _upgradePerfil(data:any){
    return this.http.post('http://localhost:8000/api/v1/upgrade-foto-perfil',data)
  }
}
