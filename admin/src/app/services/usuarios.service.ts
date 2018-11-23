import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
  ) { }

  listaUsuarios(){
    return this.http.post(environment.apiHost + '/api/v1/listarUsers/',httpOptions);
  }

  _addUser(data){
    return this.http.post<any>(environment.apiHost + '/api/v1/user/',data,httpOptions);
  }

  upgradeUsers(data,id){
    return this.http.post<any>(environment.apiHost + '/api/v1/user/'+id,data,httpOptions);
  }

  deleteUser(id:number){
    return this.http.delete(environment.apiHost + '/api/v1/user/'+id,httpOptions);
  }
}
