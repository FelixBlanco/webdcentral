import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {
  dataUser:any = {
    img_perfil: null,
    userName: null
  }
  constructor(
    private _loginService:LoginService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this._loginService._getAuthUser().subscribe(
    (resp:any) => {
      this.dataUser.userName = resp.userName;
      this.dataUser.img_perfil = resp.img_perfil;
    },
    error => {
      console.log(error);
      this.router.navigate(['']);
    })
  }

  salirLogin(){
    this._loginService._salirLogin().subscribe(
      (resp:any) => { 
        localStorage.removeItem('access_token')
        this.router.navigate(['']); 
      },
      error => { console.log('algo salio mal'); console.log(error) }
    )
  }
  
}
