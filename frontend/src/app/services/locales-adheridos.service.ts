import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LocalesAdheridosService {

    localesBehaviorSource: BehaviorSubject<any[]> = new BehaviorSubject([]);
    localesItems: Observable<any[]> = this.localesBehaviorSource.asObservable();

    header = new HttpHeaders().append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBlZDhkODNjN2E3ODI2NjU2MDNlYjY4YmIwYzM2NzUzNTk0ZjRmODQzYTMxYWM3M2FjODZkNDg4YTU0ZGMwYTdkZGZhNjUyNzI3NmJjNTI2In0.eyJhdWQiOiIzIiwianRpIjoiMGVkOGQ4M2M3YTc4MjY2NTYwM2ViNjhiYjBjMzY3NTM1OTRmNGY4NDNhMzFhYzczYWM4NmQ0ODhhNTRkYzBhN2RkZmE2NTI3Mjc2YmM1MjYiLCJpYXQiOjE1NDQwMjk1NjcsIm5iZiI6MTU0NDAyOTU2NywiZXhwIjoxNTc1NTY1NTY3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.BZgR-fARdPNdMU5mNI5A5pCpErZ7bqTC9WyzpSZxX5BSJi1WGhXZMLrWfGlOZD_ZWugqzojOrIrhfzezwkkOLuzmXCxE4gvgL1IqEIrFsycaZPptZuBxrb-ftFUsurAiCsixndNTO0x0iZwk64EsRUWH-d7Z42UZSy8GIxyriOkn_mFeZ0eE_gc-yQ1FUCA4NlPuvqKiMT3iy-aU4qTLIZlAVGJX6NeFvviSpo-0kal49C7CeHMZRi1BKrrPe3AVFdf_dyTr7AeqvWfhmmsvVqqJeqF3lD6Tvqq4HDz4kFWsnRNHacI4fxtX3pL0opJpXt2V7hCK3QkhUO5N8poPgCB5PmHX1e42uerBSzTCo8hVaHv6RmGTSwJutCo6H9M-RV7IfXDAbd0YmkQRZpO5oWkU-6V3WstdUy7vsbzV-LTASjF9rktLFREbTG69_FU0C8IAOKfD_3aYuW_r16_VogJ3kOKRNjaNoFtgbXtpB8h9aRuSAO0TmePvi1MvDB2vRvmpDyWg4TJyCCGEOB1sgARqFh9Jd3b1uVkMFruomvK5oZnG5M64B-RlUEhFaw1YhTujFe9cpTJYgK_UMpj1S2h9VdbqHbwTp4L3kmVme8UiEPBQ2opVL2xUfnSdHeXQ8-NYbgBj4b2pOp2LOK9lsHbKjSrJn9elmIkSTIfTl4Y');

    constructor(private http: HttpClient) {}

    /** Locales Ahderidos */
    getAllClasificados(): Observable<HttpResponse<any>> {
        
        return this.http.post<any>(`${environment.apiHost}/api/auth/listarClasificado`, null,{observe: 'response', headers: this.header});
    }

    getAll(){
        return this.http.post<any>(environment.apiHost + '/api/auth/listarLocalAdheridos',null, {observe: 'response', headers: this.header});
    }

    updateSource(data: any[]){
        this.localesBehaviorSource.next(data);
    }

}
