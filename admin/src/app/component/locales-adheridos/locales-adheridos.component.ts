import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalesAdheridosService } from '../../services/locales-adheridos.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertsService } from '../../services/alerts.service'
import { ClasificadosService } from '../../services/clasificados.service'

declare var $;

@Component({
  selector: 'app-locales-adheridos',
  templateUrl: './locales-adheridos.component.html',
  styleUrls: ['./locales-adheridos.component.css']
})
export class LocalesAdheridosComponent implements OnInit {

  @ViewChild('table') table;
  lista_clasificados:any;
  
  myForm: FormGroup;
  myFormEdit: FormGroup;

  foto_1:File; foto_2:File;
  foto_edit_1:File; foto_edit_2:File;
  
  idEdit:any;
  inPromise: boolean;

  columns = [
    { prop: 'nombre' },
    { prop: 'descripcion' },
    { prop: 'set_imagen_uno'},
    { prop: 'set_imagen_dos'},
    { prop: 'opciones'}
  ];
  lista_localAdheridos:any;
  rows:any;
  limit: number = 5;

  constructor(
    private localesAdheridosServices: LocalesAdheridosService,
    private fb: FormBuilder,
    private alert:AlertsService,
    private clasificadosService:ClasificadosService
  ) { 
    this.myForm = this.fb.group({
      'nombre'      : ['',Validators.required],
      'descripcion' : ['',Validators.required],
      'foto_1'      : ['',Validators.required],
      'foto_2'      : ['',Validators.required],
      'fk_idClasificado'      : ['',Validators.required],
    })

    this.myFormEdit = this.fb.group({
      'nombre'      : ['',Validators.required],
      'descripcion' : ['',Validators.required],
      'fk_idClasificado'      : ['',Validators.required],
    })

  }

  ngOnInit() {
    this.getLocalesAdheridos();
    this.getClasificados();
  }


  getLocalesAdheridos(){
    this.localesAdheridosServices._listarLocales(1).subscribe(
      (resp:any) => {        
        this.lista_localAdheridos = resp.LocalAdh;
        this.rows = [...this.lista_localAdheridos];
      }
    )
  }

  getClasificados(){
    this.clasificadosService._getClasificados(null).subscribe(
      (resp:any) => {
        this.lista_clasificados = resp.Clasificado
      }
    )
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.lista_localAdheridos.filter(function(d) {
      return (d.nombre.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.descripcion.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }

  changeFoto(event,q_foto,es){  

    if(es == 'new'){
      if(q_foto == 1){
        this.foto_1 = event.target.files[0];
      }
  
      if(q_foto == 2){
        this.foto_2 = event.target.files[0];
      }  
    }

    if(es == 'edit'){
      if(q_foto == 1){
        this.foto_edit_1 = event.target.files[0];
      }
  
      if(q_foto == 2){
        this.foto_edit_2 = event.target.files[0];
      }  
    }    

  }

  save(){
    this.inPromise = true;
    const val = this.myForm.value;
    const formData = new FormData();
    formData.append('nombre', val.nombre)
    formData.append('descripcion', val.descripcion)
    formData.append('foto_1', this.foto_1)
    formData.append('foto_2', this.foto_2),
    formData.append('fk_idClasificado', val.fk_idClasificado)

    this.localesAdheridosServices.saveLocalAdherido(formData).subscribe(
      (resp:any) => {
        $("#nuevo").modal('hide');
        this.getLocalesAdheridos();
        this.alert.msg('OK',resp.msj)
        this.inPromise = false;
      },
      error => {
        
        this.inPromise = false;

        if(error.error.errors.nombre != null){
          this.alert.msg('ERR',error.error.errors.nombre)
        }

        if(error.error.errors.descripcion != null){
          this.alert.msg('ERR',error.error.errors.descripcion)
        }
        
        if(error.error.errors.foto_1 != null){
          this.alert.msg('ERR',error.error.errors.foto_1)
        }        

        if(error.error.errors.foto_2 != null){
          this.alert.msg('ERR',error.error.errors.foto_2)
        }        
        
      }
    )

  }

  edit(data){
    $("#editar").modal('show');
    this.idEdit = data.idLocalAdherido;
    this.myFormEdit.setValue({
      nombre: data.nombre,
      descripcion: data.descripcion,
      fk_idClasificado: data.fk_idClasificado,
    })
  }

  upgrade(){
    this.inPromise = true;
    const val = this.myFormEdit.value;
    const formData = new FormData();
    formData.append('nombre', val.nombre)
    formData.append('descripcion', val.descripcion)
    if(this.foto_edit_1 != null){ formData.append('foto_1', this.foto_edit_1); }
    if(this.foto_edit_2 != null){ formData.append('foto_2', this.foto_edit_2); }
    formData.append('fk_idClasificado', val.fk_idClasificado)
    
    this.localesAdheridosServices._upgradeLocal(this.idEdit,formData).subscribe(
      (resp:any) => {
        this.inPromise = false;
        this.getLocalesAdheridos();
        $("#editar").modal('hide');
        this.alert.msg('OK',resp.msj)
      },
      error => {
        this.inPromise = false;
        this.alert.msg('ERR',error.message)
      }
    )
  }

  eliminar(id:number){
    this.inPromise = true;
    this.localesAdheridosServices._deleteLocal(id).subscribe(
      (resp:any) => {
        this.inPromise = false;
        this.getLocalesAdheridos();
        this.alert.msg('OK',resp.msj)
      },
      error => {
        this.inPromise = false;
        this.alert.msg('ERR',error.error.message)
      }
    )
  }
}
