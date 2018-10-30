import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  listaUsuarios(){
    return this.http.post('http://localhost:8000/api/v1/listarUsers/',httpOptions);
  }

  _addUser(data){
    return this.http.post('http://localhost:8000/api/v1/user/',data,httpOptions);
  }

  upgradeUsers(data){
    return this.http.put('http://localhost:8000/api/v1/user/'+data.id,data,httpOptions);
  }

  deleteUser(id:number){
    return this.http.delete('http://localhost:8000/api/v1/user/'+id,httpOptions);
  }
}
