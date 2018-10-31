import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DestacadosService {

  constructor(
    private http:HttpClient
  ) { }

  _getDestacados(){
    return this.http.get('http://localhost:8000/api/auth/obtenerDestacados',httpOptions);
  }

  _addDestacados(data:any){
    return this.http.post('http://localhost:8000/api/auth/crearDestacado',data,httpOptions);
  }

  _editDestacados(id:number, data:any){
    return this.http.put('http://localhost:8000/api/auth/editarDestacado/'+id,data,httpOptions);
  }

  _deleteDestacados(id:number){
    return this.http.delete('http://localhost:8000/api/auth/eliminarDestacado/'+id,httpOptions);
  }
}
