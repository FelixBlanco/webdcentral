import { Component, OnInit, ViewChild } from '@angular/core';
import { ClasificadoReclamoService } from '../../services/clasificado-reclamo.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertsService } from '../../services/alerts.service'

declare var $;// para poder usar Jquery
interface ClasificadosReclamos{
  idClasificadoReclamo;
  nombre;
  fk_idStatusReclamo;
}
@Component({
  selector: 'app-clasificado-reclamo',
  templateUrl: './clasificado-reclamo.component.html',
  styleUrls: ['./clasificado-reclamo.component.css']
})
export class ClasificadoReclamoComponent implements OnInit {

  @ViewChild('table') table;

  listaClasificadoReclamo:any;

  columns = [
    { prop: 'Nombre' },
    { prop: 'fk_idStatusReclamo' },
    { prop: 'idClasificadoReclamo' },
    { prop: 'opts' }
  ];

  rows: any;
  limit: number = 10;
  myForm: FormGroup;
  inPromise: boolean;
  inPromise2: boolean;
  clasificadoReclamoToUpdate:ClasificadosReclamos;
  constructor(
    private clasificadoReclamoServices: ClasificadoReclamoService,
    private alertService: AlertsService,
    private fb: FormBuilder,

  ) { 
    //formulario para agregar 
    this.myForm = this.fb.group({
      'nombre'  : ['', Validators.required],
      // 'fk_idUser' : ['', Validators.required],
      'fk_idStatusReclamo' : ['', Validators.required],
    })

  }
  
  ngOnInit() {
    this.getClaisificadoReclamos()
  }
   

  //prueba
  

  // functions peticiones al API
  getClaisificadoReclamos(){
    this.inPromise2=true;
    console.log("haciendo peticion..");
    this.clasificadoReclamoServices._getClasificadosReclamos(null).subscribe(
      (resp:any) => { 
        this.inPromise2=false;
        this.listaClasificadoReclamo = resp.clasificados;
        this.rows = [...this.listaClasificadoReclamo];
      }
    )
  }

  addClasificadoReclamo(){
    this.inPromise = true;
    const val = this.myForm.value;
    console.log(val.nombre);
    const formData = new FormData();
    formData.append('nombre', val.nombre);

    formData.append('fk_idStatusReclamo','1');
    this.clasificadoReclamoServices._addClasificadosReclamos(formData).subscribe(
      (resp:any) => {
        this.inPromise = false;
        $("#nuevo").modal('hide');
        this.getClaisificadoReclamos();
        this.alertService.msg('OK',resp.msj);
      },
      error => {
        this.inPromise = false;
        if(error.message != null){
          this.alertService.msg('ERR',error.message);
        }

        if(error.error.errors.titulo != null){
          this.alertService.msg('ERR',error.error.errors.titulo);
        }

        if(error.error.errors.foto != null){
          this.alertService.msg('ERR',error.error.errors.foto);
        }

      }
    )
  }
  deleteClasificadoReclamo(){
    this.inPromise = true;
    this.clasificadoReclamoServices._deleteClasificadosReclamos(this.clasificadoReclamoToUpdate.idClasificadoReclamo)
      .subscribe((resp:any) => {
        $('#eliminar').modal('hide');
        this.getClaisificadoReclamos();
        this.alertService.msg('OK',resp.msj);    
        this.inPromise = false;    
      },
      error => {      
        if(error.message != null){
          this.alertService.msg('ERR',error.message);
        }       
      }); 
  }
  set({idClasificadoReclamo,nombre,fk_idStatusReclamo}){
    this.clasificadoReclamoToUpdate= {
      idClasificadoReclamo,
      nombre,
      fk_idStatusReclamo,
    }

  }
  
}
