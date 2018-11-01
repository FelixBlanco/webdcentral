import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { LoginService } from '../../services/login.service';
import { AlertsService } from '../../services/alerts.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  imgPerfil:any;
  img_perfil:null;
  form:any = { id:null, name: null, email: null, password: null, userName:null, fk_idPerfil:null }


  constructor(
    private _perfilService: PerfilService,
    private _loginService: LoginService,
    private _alertService: AlertsService
  ) { }

  ngOnInit() {
    this.getAuthUser();
  }

  getAuthUser(){
    // this._loginService._getAuthUser().subscribe(
    //   (resp:any) => {
    //     this.form.id = resp.id;
    //     this.form.name = resp.name;
    //     this.form.userName = resp.userName;
    //     this.form.email = resp.email;
    //     this.img_perfil = resp.img_perfil
    //     this.form.fk_idPerfil = resp.fk_idPerfil
    //   },
    //   error =>{
    //     console.log(error);
    //   }
    // )
  }

  upImgPerfil(event){
    this.imgPerfil = event.target.files[0];
  }

  upgradeFormPerfil(){
    this._perfilService._upgradeInfoPerfil(this.form).subscribe(
      resp => {
        this._alertService.msg("OK","Éxito", "Actualizacion exitosa");
      },
      error => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  upgradeImgPerfil(){
    
    let form_data = new FormData();

    form_data.append('fotoPerfil', this.imgPerfil);
    form_data.append('id_user', this.form.id);

    this._perfilService._upgradePerfil(form_data).subscribe(
      resp => { this.getAuthUser(); this._alertService.msg("OK","Éxito", "Actualizacion exitosa"); },
      error => { this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`); }
    )

  }

}
