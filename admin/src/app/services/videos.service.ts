import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class VideosService {

  constructor(
    private http: HttpClient,    
  ) {  }

  getVideos(){
    return this.http.get(environment.apiHost + '/api/auth/video',httpOptions);
  }

  addVideo(data:any){    
    return this.http.post(environment.apiHost + '/api/auth/video',data,httpOptions);
  }

  upgradeVideo(data:any,id:number){    
    return this.http.put(environment.apiHost + '/api/auth/video/'+id,data,httpOptions);
  }

  changeStatusVideo(id:number){    
    return this.http.put(environment.apiHost + '/api/auth/video/cambiarStatus/'+id,httpOptions);
  }
  
  deleteVideo(id:number){    
    return this.http.delete(environment.apiHost + '/api/auth/video/'+id,httpOptions);
  }
}
