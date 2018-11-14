import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {

  constructor(
    private http:HttpClient
  ) { }

  _getPerfilCliente(id:number){
    return this.http.get(`${environment.apiHost}/api/v1/get-perfil-cliente/`+id);
  }
  _lista(){
    return this.http.get(`${environment.apiHost}/api/v1/perfilesClientes/listar`)
  }

  _crear(data:any){
    return this.http.post(`${environment.apiHost}/api/v1/crearPerfilCliente`,data);    
  }

  _update(data:any,id:number){
    return this.http.put(`${environment.apiHost}/api/v1/actualizarPerfilCliente/`+id,data);
  }

  _eliminar(id:number){    
    return this.http.delete(`${environment.apiHost}/api/v1/eliminarPerfilCliente/`+id);
  }
}
