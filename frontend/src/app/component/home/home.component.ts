import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:any =  localStorage.getItem('access_token');

  dataUser:any = {
    id:null, 
    userName: null,
    img_perfil:null
  };

  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
      private _loginService: LoginService
    ) { }

  ngOnInit() {
    this.getAuthUser();
  }

  getAuthUser(){
    this._loginService._getAuthUser().subscribe(
      (resp:any) => { 
        this.dataUser.id = resp.id;
        this.dataUser.userName = resp.userName; 
        this.dataUser.img_perfil = resp.img_perfil;
      },
      error => {
        console.log('Algo anda mal')
        //this.router.navigate(['']);
       }
    )
  }

  salirLogin(){
    this._loginService._salirLogin().subscribe(
      (resp:any) => { this.router.navigate(['']); },
      error => { console.log('algo salio mal'); console.log(error) }
    )
  }
  
}
