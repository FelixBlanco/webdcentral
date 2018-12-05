import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BlogService {

    constructor(private http: HttpClient) {}

    /** Categorías */
    getAllCategories(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarCatBlog`, {observe: 'response'});
    }

    getOneCategory(id:number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarPorIdCatBlog/${id}`, {observe: 'response'});
    }

    /** Blog */
    getAll(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarBlog`, {observe: 'response'});
    }

    getOne(id:number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${environment.apiHost}/api/v1/listarPorIdBlog/${id}`, {observe: 'response'});
    }

}