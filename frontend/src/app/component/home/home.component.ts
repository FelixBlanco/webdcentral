import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  token:any =  localStorage.getItem('access_token');
  imgPerfil:any;

  dataUser:any = {
    id:null, 
    userName: null,
    foto_perfil: null,
    img_perfil:null
  };

  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
    ) { }

  ngOnInit() {
    this.getAuthUser();
  }

  getAuthUser(){
    return this.http.get('http://localhost:8000/api/auth/getUser/',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    }).subscribe(
      (resp:any) => { 
        this.dataUser.id = resp.id;
        this.dataUser.userName = resp.userName; 
        this.dataUser.img_perfil = resp.img_perfil;
      },
      error => {
        this.router.navigate(['']);
       }
    )
  }
  
  salirLogin(){
    return this.http.get('http://localhost:8000/api/auth/logout',{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    }).subscribe(
      (resp:any) => { this.router.navigate(['']); },
      error => { console.log('algo salio mal'); console.log(error) }
    )
  }

  upImgPerfil(event){
    this.imgPerfil = event.target.files[0];
  }

  upgradeImgPerfil(){
    let form_data = new FormData();
    form_data.append('img_perfil', this.imgPerfil);
    form_data.append('user_id', this.dataUser.id);

    return this.http.post('http://localhost:8000/api/v1/upgrade-foto-perfil',form_data).subscribe(
      resp => { console.log(resp) },
      error => { console.log(error) }
    )
  }  
}
