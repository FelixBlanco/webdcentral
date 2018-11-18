import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigRedesService {

  constructor(private http: HttpClient) { }

  _getRed(){
    return this.http.get(`${environment.apiHost}/api/v1/get-redes`);
  }

}
