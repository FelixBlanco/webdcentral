import { Component, OnInit, ViewChild } from '@angular/core';
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
  
  @ViewChild('tableAbierto') tableAbierto;
  @ViewChild('tableRecibido') tableRecibido;
  @ViewChild('tableCerrado') tableCerrado;
  

  form:any = {titulo:null, descripcion:null, fk_idUser: null, fk_idStatusReclamo: 1 };
  idPerfil:any=null;
  listReclamos:any;

  listReclamosAbiertos:any = null;
  listReclamosRecibido:any = null;
  listReclamosCerrado:any = null;

  columns:any;
  // ROWs Table
  abierto:any;
  recibido:any;
  cerrado:any;

  constructor(
    private _reclamosSugerenciasService:ReclamosSugerenciasService,
    private _loginService: LoginService,
    private _alertService: AlertsService,
    ) {
      this.columns = [
        { prop: 'titulo'},
        { prop: 'descripcion' },
        { prop: 'statusReclamoSugerencia' },
        { prop: 'opts'}
      ];      
    }

  ngOnInit() {
    this.getReclamos();

    $("#nav-recibida").click(function(){      
      $("#nav-abierto").removeClass('active');
      $("#nav-cerrada").removeClass('active');
      $("#nav-recibida").addClass('active');
      //None
      $("#list-cerrada").css('display','none')
      $("#list-abierto").css('display','none')
      $("#list-recibida").css('display','block')
    });
       
    
    $("#nav-abierto").click(function(){      
      $("#nav-recibida").removeClass('active');
      $("#nav-cerrada").removeClass('active');
      $("#nav-abierto").addClass('active');
      //None
      $("#list-cerrada").css('display','none')
      $("#list-recibida").css('display','none')
      $("#list-abierto").css('display','block')
    });

    $("#nav-cerrada").click(function(){      
      $("#nav-recibida").removeClass('active');
      $("#nav-abierto").removeClass('active');
      $("#nav-cerrada").addClass('active');
      //None
      $("#list-recibida").css('display','none')
      $("#list-abierto").css('display','none')
      $("#list-cerrada").css('display','block')
    });

  }

  clickUpdate(){
    this.getReclamos()
  }

  getReclamos(){
    this._reclamosSugerenciasService._getReclamos().subscribe(
      (resp:any) => {
        
        this.listReclamosAbiertos = resp.r_abiertos
        this.abierto = [...this.listReclamosAbiertos];

        this.listReclamosRecibido = resp.r_recibido
        this.recibido = [...this.listReclamosRecibido];

        this.listReclamosCerrado = resp.r_cerrado
        this.cerrado = [...this.listReclamosCerrado];
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

  upgradeStatus(event,idReclamo:number){
    const idValor =  event.target.value;
    this._reclamosSugerenciasService._upgradeEstatus(idReclamo,idValor).subscribe(
      (resp:any) =>{
        this.getReclamos();
        this._alertService.msg('OK','Éxito','Cambios exitosos');
      },
      error => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }


  

  updateFilter(event, es){
    if(es == 'abierto'){
      const val = event.target.value.toLowerCase();

      const temp = this.listReclamosAbiertos.filter(function(d) {
        return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val)
        || (d.descripcion.toLowerCase().indexOf(val) !== -1 || !val);
      });
  
      this.abierto = temp;
      this.tableAbierto.offset = 0;//Requerido
    }

    if(es == 'recibido'){
      const val = event.target.value.toLowerCase();

      const temp = this.listReclamosRecibido.filter(function(d) {
        return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val)
        || (d.descripcion.toLowerCase().indexOf(val) !== -1 || !val);
      });
  
      this.recibido = temp;
      this.tableRecibido.offset = 0;//Requerido
    }
    
    if(es == 'cerrado'){
      const val = event.target.value.toLowerCase();

      const temp = this.listReclamosCerrado.filter(function(d) {
        return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val)
        || (d.descripcion.toLowerCase().indexOf(val) !== -1 || !val);
      });
  
      this.cerrado = temp;
      this.tableCerrado.offset = 0;//Requerido
    }    

  }   
}
