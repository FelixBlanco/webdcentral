import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) {}

  _getListaVideos(){
    return this.http.get(`${environment.apiHost}/api/v1/video/listar`,httpOptions);
  }

}
