import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'
import { LoginService  } from '../../services/login.service';

@Component({
  selector: 'app-reclamos-sugerencias',
  templateUrl: './reclamos-sugerencias.component.html',
  styleUrls: ['./reclamos-sugerencias.component.css']
})
export class ReclamosSugerenciasComponent implements OnInit {

  form:any = {titulo:null, descripcion:null, fk_idUser: null, fk_idStatusReclamo: 1 };
  
  listReclamos:any;

  constructor(
    private _reclamosSugerenciasService:ReclamosSugerenciasService,
    private _loginService: LoginService,
    ) { }

  ngOnInit() {
    this.getReclamos();
  }

  getLoginUser(){
    this._loginService._getAuthUser().subscribe(
      (resp:any) => {
        this.form.fk_idUser = resp.id
      },
      error => {
        console.log(error)
      }
    )
  }

  getReclamos(){
    this._reclamosSugerenciasService._getReclamos().subscribe(
      (resp:any) => {
        this.getLoginUser();
        this.listReclamos = resp
      },
      error => {
        console.log(error);
      }
    )
  }

  addReclamos(){
    this._reclamosSugerenciasService._addReclamos(this.form).subscribe(
      resp => {
        this.getReclamos();
        console.log(resp)
      },
      error => {
        console.log(error);
      }
    )
  }

}
