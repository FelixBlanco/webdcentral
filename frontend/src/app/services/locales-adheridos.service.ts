import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LocalesAdheridosService {

    localesBehaviorSource: BehaviorSubject<any> = new BehaviorSubject(null);
    idClasificadoSeleccionado: Observable<any> = this.localesBehaviorSource.asObservable();

  
    header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));/* 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMyMzdlNmJmMzkyMmMzNDU3YjNkOTJlZjI0YWQ3NjJhZjliNGU2YTM5MWMzNDk3NDRjYzJkNWM4ZjQzMTRmZmIyMjliNTllNTJiOTE0NmQ2In0.eyJhdWQiOiIzIiwianRpIjoiMzIzN2U2YmYzOTIyYzM0NTdiM2Q5MmVmMjRhZDc2MmFmOWI0ZTZhMzkxYzM0OTc0NGNjMmQ1YzhmNDMxNGZmYjIyOWI1OWU1MmI5MTQ2ZDYiLCJpYXQiOjE1NDQ5MTQ2MzMsIm5iZiI6MTU0NDkxNDYzMywiZXhwIjoxNTc2NDUwNjMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WTR90FhdU3lsykeMynhAw1xHQZfV5By8dADM6aPZdW9vi-aYSqrn7czrfkQbaE1_c2QDKrSxID_KjKjPP1eEKKV4di4mx83jhPktQznxVMrpDpVcWLBH9hc--b7_jYjaMu7NvFrkgJwMnu5aoNT7XcMLgfM7K1u4tw2iOoTlj4uYFsaTumVquXKi3aHa24EAXQ5Pn5myyOR7-Vlkl-A-40jphYOqUHeJcQIDieGUbyJ73OEnjFY4uo-bfWRbjkQvwxnkm0aCv1-P0TfP1ZkagKrIcXw1-vLy_bAvG0LNpdPVNkcKQW2xJQYnDQoEVu5avF3Hc1aQCZIYtGMmKb2m934kul9LLFIG-r3n_EXqhraumqMiZKZk1c8Ww_hd9RiEha9Cx_OyAu4jYDyTR0mUSszwq2jHFuckiT7ezeaoDFF0bk_ypW-iZBQ8m_R6EwA9ix4N1v6akZmahgilsJYtKAJhOfYHnmsJoj9PWyW1NPv7X35G00P68yA6EjfimOU4harD_zQvuBCVaxVVFZSBIobHCE6NZV8Q6S0Ohu8uo7UW7gGH10_x6KltsJhdmg81MGjBPOcjyXRpsAFpG0Ux5TTuVGrtpH9KWRr1PVkqGa2WOS2qSvfWQUVg5dfIzvhZFruId71gREoqnBzM7k4zqVdlq_WNVhr0USgAR1ynu0s'); */

    constructor(private http: HttpClient) {}

    /** Locales Ahderidos */
    getAllClasificados(): Observable<HttpResponse<any>> {
        
        return this.http.post<any>(`${environment.apiHost}/api/auth/listarClasificado`, null,{observe: 'response', headers: this.header});
    }
    getAllClasificadosSinAuth(): Observable<HttpResponse<any>> {
        
        return this.http.post<any>(`${environment.apiHost}/api/v1/listarClasificado`, null,{observe: 'response'});
    }
    getAll(){
        return this.http.post<any>(environment.apiHost + '/api/auth/listarLocalAdheridos',null, {observe: 'response', headers: this.header});
    }

    updateSource(data: any[]){
        this.localesBehaviorSource.next(data);   

    }
    

    getListaPorNro(nro:number){
        return this.http.get(environment.apiHost + '/api/v1/lista-locales-por-nro/'+ nro);
    }
    
}
