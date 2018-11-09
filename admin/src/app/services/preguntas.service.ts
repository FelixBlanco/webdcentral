import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalD } from '../global';

@Injectable()
export class PreguntasService {
    public _GB: GlobalD;

    httpOptions;
    constructor(private http:HttpClient,public GB: GlobalD){
        this._GB = GB;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
            }),
            observe: 'response'  
        };
    }

    getAll(body: any): Observable<HttpResponse<any>>{
        return this.http.post<any>(this._GB.API + '/api/v1/listar',body,this.httpOptions) as Observable<HttpResponse<any>>;
    }

    persist(question: any): Observable<HttpResponse<any>>{
        return this.http.post<any>(this._GB.API + '/api/auth/crearPreguntaYRespuesta',question,this.httpOptions) as Observable<HttpResponse<any>>;        
    }

    update(question: any):  Observable<HttpResponse<any>>{
        return this.http.put<any>(this._GB.API + `/api/auth/editarPreguntaORespuesta/${question.idPreguntaFrecuente}`,question,this.httpOptions) as Observable<HttpResponse<any>>;        
    }

    delete(id: number):  Observable<HttpResponse<any>>{
        return this.http.delete<any>(this._GB.API + `/api/auth/borrarPreguntaORespuesta/${id}`,this.httpOptions) as Observable<HttpResponse<any>>;        
    }

    updateStatus(data: any){
        return this.http.put<any>(this._GB.API + `/api/auth/cambiarStatus/${data.idPreguntaFrecuente}`,{"fk_idStatusSistema": data.fk_idStatusSistema},this.httpOptions) as Observable<HttpResponse<any>>;      
    }


}