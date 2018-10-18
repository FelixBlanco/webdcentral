import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

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
export class ReclamosSugerenciasService {

  constructor(
    private http:HttpClient
  ) { }

  // Esperando por definicion de rutas
  _getReclamos(){}

  _addReclamos(){}
}
