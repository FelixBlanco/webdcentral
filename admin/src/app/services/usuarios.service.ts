import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalD } from '../global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public _GB: GlobalD;

  constructor(
    private http: HttpClient,
    public GB: GlobalD
    ) { this._GB = GB; }

  listaUsuarios(){
    return this.http.post(this._GB.API +'/api/v1/listarUsers/',httpOptions);
  }

  _addUser(data){
    return this.http.post(this._GB.API +'/api/v1/user/',data,httpOptions);
  }

  upgradeUsers(data){
    return this.http.put(this._GB.API +'/api/v1/user/'+data.id,data,httpOptions);
  }

  deleteUser(id:number){
    return this.http.delete(this._GB.API +'/api/v1/user/'+id,httpOptions);
  }
}
