import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarcasService {
    fromMarcaInicioSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
    fromMarcaInicio: Observable<boolean> = this.fromMarcaInicioSource.asObservable();    
    constructor(private http: HttpClient){}

    getMarcasBy(by?: string): Observable<HttpResponse<any>>{
        return this.http.get<any>(`${environment.apiHost}/api/v1/marcas/${by}`,{observe:'response'})
    }
    updateFromMarcaInicio(data:boolean){
        this.fromMarcaInicioSource.next(data);
    }
}