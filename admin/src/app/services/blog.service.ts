import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BlogService {

    httpOptions: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
    constructor(private http: HttpClient) {}

    /** Categorías */
    getAllCategories(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarCatBlog`, {headers: this.httpOptions, observe: 'response'});
    }

    getOneCategory(id:number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarPorIdCatBlog/${id}`, {headers: this.httpOptions, observe: 'response'});
    }
    
    persistCategory(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/v1/addCatBlog`, body, {headers: this.httpOptions, observe: 'response'});
    }

    updateCategory(data: any, id: number): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/v1/editCatBlog/${id}`, data , {headers: this.httpOptions, observe: 'response'});
    }

    deleteCategory(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${environment.apiHost}/api/v1/borrarCatBlog/${id}`, {headers: this.httpOptions, observe: 'response'});
    }

    /** Blog */
    getAll(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/auth/listarBlog`, {headers: this.httpOptions, observe: 'response'});
    }

    getOne(id:number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/auth/listarPorIdBlog/${id}`, {headers: this.httpOptions, observe: 'response'});
    }
    
    persist(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/auth/addBlog`, body, {headers: this.httpOptions, observe: 'response'});
    }

    update(data: any, id: number): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${environment.apiHost}/api/auth/editBlog/${id}`, data , {headers: this.httpOptions, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${environment.apiHost}/api/auth/borrarBlog/${id}`, {headers: this.httpOptions, observe: 'response'});
    }

}