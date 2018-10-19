import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  imgPerfil:any;
  img_perfil:null;
  form:any = { name: null, email: null, password: null, userName:null }


  constructor(
    private _perfilService: PerfilService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.getAuthUser();
  }

  getAuthUser(){
    this._loginService._getAuthUser().subscribe(
      (resp:any) => {
        this.form.name = resp.name;
        this.form.userName = resp.userName;
        this.form.email = resp.email;
        this.img_perfil = resp.img_perfil
      },
      error =>{
        console.log(error);
      }
    )
  }

  upImgPerfil(event){
    this.imgPerfil = event.target.files[0];
  }

  upgradeFormPerfil(){
    this._perfilService._upgradeInfoPerfil(this.form).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log(error)
      }
    )
  }

  upgradeImgPerfil(){
    let form_data = new FormData();
    form_data.append('img_perfil', this.imgPerfil);
    form_data.append('user_id', '1');

    this._perfilService._upgradePerfil(form_data).subscribe(
      resp => { console.log(resp) },
      error => { console.log(error) }
    )
  }

}
