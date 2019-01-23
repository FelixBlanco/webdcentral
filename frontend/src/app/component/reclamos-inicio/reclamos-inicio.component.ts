import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'
import { AlertsService } from '../../services/alerts.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { ConfigColorService } from '../../services/config-color.service';
import { ClasificacionReclamosService } from '../../services/clasificacion-reclamos.service';

declare var $;

@Component({
  selector: 'app-reclamos-inicio',
  templateUrl: './reclamos-inicio.component.html',
  styleUrls: ['./reclamos-inicio.component.css']
})
export class ReclamosInicioComponent implements OnInit {
  inPromise:boolean = false;
  myForm:FormGroup;
  colorTres:any;
  fecha:any;
  listaClasificacionReclamos:any;
  
  constructor(
    private _reclamosSugerenciasService: ReclamosSugerenciasService, 
    private _alertService:AlertsService , 
    private fb:FormBuilder,
    private configColor: ConfigColorService,
    private _clasificacionReclamos: ClasificacionReclamosService) {
    this.myForm = this.fb.group({
      'titulo'      :['',Validators.required],
      'descripcion' :['',Validators.required]
    })

    this.configColor._getColor().subscribe(
      (resp:any)=> {
        this.colorTres = resp.colorClaro
      }
    ) 
    this.inPromise = false;   

    this.fecha = new Date();
    
    this._clasificacionReclamos._getClasificacionReclamos().subscribe(resp => {
      this.listaClasificacionReclamos = resp['clasificados'];
      console.log(this.listaClasificacionReclamos);
    });

    
  
    
   }

  ngOnInit() {}


  clickModal(){
    if(localStorage.getItem('token') != null){
      $("#reclamoModel").modal('show');
    }else{
      $("#reclamoMSJModel").modal('show');
    }
  }
  
  addReclamos(){
    this.inPromise = true;
    const userId = JSON.parse( localStorage.getItem('user_data') ); // recuperamos el id del usuario
    const val = this.myForm.value;
    const numeroTicket = this.generarNumeroTicket();
    const data: any = { 
      titulo: val.titulo, 
      descripcion: val.descripcion,
      numero_ticket : numeroTicket,
      fk_idUser: userId.id, 
      fk_idStatusReclamo: 1 }
    this._reclamosSugerenciasService._addReclamos(data).subscribe(
      (resp:any) => {
        $("#reclamoModel").modal('hide');
        this._alertService.msg('OK',resp.msj); 
        this.inPromise = false;
      },
      error => {
        this.inPromise = false;
        if(error.error.errors.titulo != null){
          this._alertService.msg('ERR',error.error.errors.titulo); 
        }
        if(error.error.errors.descripcion != null){
          this._alertService.msg('ERR',error.error.errors.descripcion); 
        }        
        if(error.message != null){
          this._alertService.msg('ERR',error.message); 
        }              
      }
      
    )
  }


  generarNumeroTicket(){
    const dia = this.fecha.getDate();
    const mes = this.fecha.getMonth()+1;
    const año = this.fecha.getFullYear();
    const minutos = this.fecha.getMinutes();
    const segundos = this.fecha.getSeconds();

    const numeroTicket = "TK-"+dia+mes+año+minutos+segundos;
    console.log(numeroTicket);
    return numeroTicket;
  }

}
