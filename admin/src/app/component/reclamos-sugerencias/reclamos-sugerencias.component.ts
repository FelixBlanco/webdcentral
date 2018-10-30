import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'
import { LoginService  } from '../../services/login.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-reclamos-sugerencias',
  templateUrl: './reclamos-sugerencias.component.html',
  styleUrls: ['./reclamos-sugerencias.component.css']
})
export class ReclamosSugerenciasComponent implements OnInit {

  form:any = {titulo:null, descripcion:null, fk_idUser: null, fk_idStatusReclamo: 1 };
  idPerfil:any=null;
  listReclamos:any;

  changeStatus:any=null;

  constructor(
    private _reclamosSugerenciasService:ReclamosSugerenciasService,
    private _loginService: LoginService,
    private _alertService: AlertsService,
    ) { }

  ngOnInit() {
    this.getReclamos();
    this.getLoginUser();
  }

  getLoginUser(){
    // this._loginService._getAuthUser().subscribe(
    //   (resp:any) => {
    //     this.form.fk_idUser = resp.id
    //     this.idPerfil = resp.fk_idPerfil
    //   }
    // )
  }

  getReclamos(){
    this._reclamosSugerenciasService._getReclamos().subscribe(
      (resp:any) => {
        this.getLoginUser();
        this.listReclamos = resp
      }
    )
  }

  addReclamos(){
    this._reclamosSugerenciasService._addReclamos(this.form).subscribe(
      resp => {
        this.getReclamos();
        this._alertService.Success('Reclamo agregado'); 
      },
      error => {
        this._alertService.listError(error.error);
      }
    )
  }

  upgradeStatus(id:number){
    this._reclamosSugerenciasService._upgradeEstatus(id,this.changeStatus).subscribe(
      (resp:any) =>{
        this.getReclamos();
        this._alertService.Success(resp.msj);
      },
      error => {
        this._alertService.listError(error.error);
      }
    )
  }

}
