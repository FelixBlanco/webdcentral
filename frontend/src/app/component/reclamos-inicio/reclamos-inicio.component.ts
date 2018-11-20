import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'
import { AlertsService } from '../../services/alerts.service'

declare var $;

@Component({
  selector: 'app-reclamos-inicio',
  templateUrl: './reclamos-inicio.component.html',
  styleUrls: ['./reclamos-inicio.component.css']
})
export class ReclamosInicioComponent implements OnInit {

  form:any = {titulo:null, descripcion:null, fk_idUser: null, fk_idStatusReclamo: 1 };

  // isSession = localStorage.getItem('access_token')

  constructor(private _reclamosSugerenciasService: ReclamosSugerenciasService, private _alertService:AlertsService ) { }

  ngOnInit() {
  }


  clickModal(){
    if(localStorage.getItem('access_token') != null){
      $("#reclamoModel").modal('show');
    }
  }
  
  addReclamos(){
    if(localStorage.getItem('access_token') != null){}
    this._reclamosSugerenciasService._addReclamos(this.form).subscribe(
      resp => {
        $("#reclamoModel").modal('hide');
        this.form = {titulo:null, descripcion:null, fk_idUser: null, fk_idStatusReclamo: 1 };
        this._alertService.msg('OK','Se envio exitosamente'); 
      },
      error => {
        this._alertService.listError(error.error);
      }
    )
  }

}
