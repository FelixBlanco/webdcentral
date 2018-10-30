import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PreguntasService {

    httpOptions;
    constructor(private http:HttpClient){
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
        return this.http.post<any>('http://localhost:8000/api/auth/listar',body,this.httpOptions) as Observable<HttpResponse<any>>;
    }

    persist(question: any): Observable<HttpResponse<any>>{
        return this.http.post<any>('http://localhost:8000/api/auth/crearPreguntaYRespuesta',question,this.httpOptions) as Observable<HttpResponse<any>>;        
    }

    update(question: any):  Observable<HttpResponse<any>>{
        return this.http.put<any>(`http://localhost:8000/api/auth/editarPreguntaORespuesta/${question.idPreguntaFrecuente}`,question,this.httpOptions) as Observable<HttpResponse<any>>;        
    }

    delete(id: number):  Observable<HttpResponse<any>>{
        return this.http.delete<any>(`http://localhost:8000/api/auth/borrarPreguntaORespuesta/${id}`,this.httpOptions) as Observable<HttpResponse<any>>;        
    }

    updateStatus(data: any){
        return this.http.put<any>(`http://localhost:8000/api/auth/cambiarStatus/${data.idPreguntaFrecuente}`,{"fk_idStatusSistema": data.fk_idStatusSistema},this.httpOptions) as Observable<HttpResponse<any>>;      
    }


}