import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'
import { LoginService  } from '../../services/login.service';
import { AlertsService } from '../../services/alerts.service';


declare var $;

@Component({
  selector: 'app-reclamos-sugerencias',
  templateUrl: './reclamos-sugerencias.component.html',
  styleUrls: ['./reclamos-sugerencias.component.css']
})

export class ReclamosSugerenciasComponent implements OnInit {

  form:any = {titulo:null, descripcion:null, fk_idUser: null, fk_idStatusReclamo: 1 };
  idPerfil:any=null;
  listReclamos:any;

  listReclamosAbiertos:any = null;
  listReclamosRecibido:any = null;
  listReclamosCerrado:any = null;

  changeStatus:any=null;

  constructor(
    private _reclamosSugerenciasService:ReclamosSugerenciasService,
    private _loginService: LoginService,
    private _alertService: AlertsService,
    ) {}

  ngOnInit() {
    this.getReclamos();

    $("#nav-recibida").click(function(){
      console.log('dio recibida')
      $("#nav-abierto").removeClass('active');
      $("#nav-cerrada").removeClass('active');
      $("#nav-recibida").addClass('active');
      //None
      $("#list-cerrada").css('display','none')
      $("#list-abierto").css('display','none')
      $("#list-recibida").css('display','block')
    });
       
    
    $("#nav-abierto").click(function(){
      console.log('dio abierto')
      $("#nav-recibida").removeClass('active');
      $("#nav-cerrada").removeClass('active');
      $("#nav-abierto").addClass('active');
      //None
      $("#list-cerrada").css('display','none')
      $("#list-recibida").css('display','none')
      $("#list-abierto").css('display','block')
    });

    $("#nav-cerrada").click(function(){
      console.log('dio cerrada')
      $("#nav-recibida").removeClass('active');
      $("#nav-abierto").removeClass('active');
      $("#nav-cerrada").addClass('active');
      //None
      $("#list-recibida").css('display','none')
      $("#list-abierto").css('display','none')
      $("#list-cerrada").css('display','block')
    });

  }

  getReclamos(){
    this._reclamosSugerenciasService._getReclamos().subscribe(
      (resp:any) => {
        console.log(resp);
        this.listReclamosAbiertos = resp.r_abiertos
        this.listReclamosRecibido = resp.r_recibido
        this.listReclamosCerrado = resp.r_cerrado
      }
    )
  }

  addReclamos(){
    this._reclamosSugerenciasService._addReclamos(this.form).subscribe(
      resp => {
        this.getReclamos();
        this._alertService.msg('OK','Éxito','se guardo correctamente'); 
      },
      error => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  upgradeStatus(id:number){
    this._reclamosSugerenciasService._upgradeEstatus(id,this.changeStatus).subscribe(
      (resp:any) =>{
        this.getReclamos();
        this._alertService.msg('OK','Éxito','Cambios exitosos');
      },
      error => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

}
