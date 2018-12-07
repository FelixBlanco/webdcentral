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
  myFormUpdate: FormGroup;
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
      'fk_idStatusReclamo' : ['', Validators.required],
    })
    //formulario para Actualizar
    this.myFormUpdate = this.fb.group({
      'nombre'  : ['', Validators.required],
      'fk_idStatusReclamo' : ['', Validators.required],
    })

  }
  
  ngOnInit() {
    this.inPromise2= true;
    this.getClaisificadoReclamos()
  }
   


  

  // functions peticiones al API
  
  getClaisificadoReclamos(){
    this.inPromise=true;
    this.clasificadoReclamoServices._getClasificadosReclamos(null).subscribe(
      (resp:any) => { 
        this.inPromise=false;
        this.inPromise2=false;
        this.listaClasificadoReclamo = resp.clasificados;
        this.rows = [...this.listaClasificadoReclamo];
      }
    )
  }

  addClasificadoReclamo(){
    this.inPromise = true;
    const val = this.myForm.value;
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
  updateClasificadoReclamo(){
    this.inPromise = true;
    const val = this.myFormUpdate.value;
    const formData = new FormData();
    const id = this.clasificadoReclamoToUpdate.idClasificadoReclamo;
    formData.append('nombre', val.nombre);
    formData.append('fk_idStatusReclamo', this.clasificadoReclamoToUpdate.fk_idStatusReclamo);
    this.clasificadoReclamoServices._actualizarClasificadoReclamo(id,formData).subscribe(
      (resp:any) =>{
        $("#modificar").modal('hide');
        this.getClaisificadoReclamos();
        this.alertService.msg('OK',resp.msj);
        this.inPromise = false;        
      },
      error => {
        this.inPromise = false;
        
        if(error.msj != null){
          this.alertService.msg('ERR',error.msj);
        }

        if(error.message != null){
          this.alertService.msg('ERR',error.message);
        }

      }
    )
  }
  changeStatus(){
    const status = (this.clasificadoReclamoToUpdate.fk_idStatusReclamo == 1) ? 2: 1;
    this.inPromise = true;
    const id = this.clasificadoReclamoToUpdate.idClasificadoReclamo;
    const name = this.clasificadoReclamoToUpdate.nombre;
    this.clasificadoReclamoToUpdate.fk_idStatusReclamo = status;
    this.clasificadoReclamoServices._actualizarClasificadoReclamo(id,this.clasificadoReclamoToUpdate).subscribe(
      (resp:any) =>{
        $("#estado").modal('hide');
        this.getClaisificadoReclamos();
        this.alertService.msg('OK',resp.msj);
        this.inPromise = false;        
      },
      error => {
        this.inPromise = false;
        
        if(error.msj != null){
          this.alertService.msg('ERR',error.msj);
        }

        if(error.message != null){
          this.alertService.msg('ERR',error.message);
        }

      }
    )  
  }
  set({idClasificadoReclamo,nombre,fk_idStatusReclamo}){
    this.clasificadoReclamoToUpdate= {
      idClasificadoReclamo,
      nombre,
      fk_idStatusReclamo,
    }
    this.myFormUpdate.get('nombre').setValue(this.clasificadoReclamoToUpdate.nombre);

  }
  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.listaClasificadoReclamo.filter(function(d) {
      return (d.nombre.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.nombre.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }
  
}
