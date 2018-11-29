import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertsService } from '../../services/alerts.service'
import { ClasificadosService } from '../../services/clasificados.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginService } from '../../services/login.service'
import { StatusSistemaService } from '../../services/status-sistema.service'

declare var $;

@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.component.html',
  styleUrls: ['./clasificados.component.css']
})
export class ClasificadosComponent implements OnInit {
  
  @ViewChild('table') table;

  newFoto:File; editFoto:File;
  idUser:any;
  lista_sSistemas: any;
  
  editIdStatusSistema: number; 
  editNameStatusSistema: number; 
  idEdit:number;

  myForm: FormGroup;
  myFormEdit: FormGroup;

  columns = [
    { prop: 'titulo' },
    { prop: 'foto' },
    { prop: 'status_sistema' },
    { prop: 'opts'}
  ];

  rows: any;

  constructor(
    private alertService: AlertsService,
    private clasificadoServices: ClasificadosService,
    private fb: FormBuilder,
    private loginService:LoginService,
    private statusSistemaService: StatusSistemaService
  ) {

    this.loginService._getAuthUser(localStorage.getItem('access_token')).subscribe(
      (resp:any) => {
        this.idUser = resp.id;
      }
    )

    this.myForm = this.fb.group({
      'foto'    : ['', Validators.required],
      'titulo'  : ['', Validators.required],
      // 'fk_idUser' : ['', Validators.required],
      'fk_idStatusSistema' : ['', Validators.required],
    })
   
    this.myFormEdit = this.fb.group({
      // 'foto'    : ['', Validators.required],
      'titulo'  : ['', Validators.required],
      // 'fk_idUser' : ['', Validators.required],
      'fk_idStatusSistema' : ['', Validators.required],
    })

  }

  ngOnInit() {
    this.getClasificacidos();
    this.getStatusSistema();
  }

  upFoto(event,es){
    
    if(es == 'new'){
      this.newFoto = event.target.files[0];
    }

    if(es == 'edit'){
      this.editFoto = event.target.files[0];
    }

  }

  getStatusSistema(){
    this.statusSistemaService._getStatusSistema().subscribe(
      resp => {
        this.lista_sSistemas = resp;
      }
    )
  }

  getClasificacidos(){
    this.clasificadoServices._getClasificados(null).subscribe(
      (resp:any) => {
        this.rows = [...resp.Clasificado];
      }
    )
  }

  addClasificado(){
    const val = this.myForm.value;
    const formData = new FormData();
    formData.append('titulo', val.titulo);
    formData.append('foto', this.newFoto);
    formData.append('fk_idUser',this.idUser);
    formData.append('fk_idStatusSistema','1');
    this.clasificadoServices._addClasificados(formData).subscribe(
      (resp:any) => {
        $("#nuevo").modal('hide');
        this.getClasificacidos();
        this.alertService.msg('OK',resp.msj);
      },
      error => {
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

  showClasificado(id:number){

    this.clasificadoServices._getPorIdClasificados(id).subscribe(
      (resp:any) => {
        $("#editar").modal('show');
        this.idEdit = resp.Clasificado.idClasificado;
        this.editIdStatusSistema = resp.Clasificado.fk_idStatusSistema;
        this.editNameStatusSistema = resp.Clasificado.nameStatusSistema;
        console.log(resp)
        this.myFormEdit.setValue({
          titulo: resp.Clasificado.titulo,
          fk_idStatusSistema: resp.Clasificado.fk_idStatusSistema,
        })
      }
    )

  }
  
  editClasificado(){
    const val = this.myFormEdit.value;
    console.log(val)
    const formData = new FormData();
    formData.append('titulo', val.titulo);
    formData.append('foto', this.editFoto);
    formData.append('fk_idUser',this.idUser);
    formData.append('fk_idStatusSistema',val.fk_idStatusSistema);    
    this.clasificadoServices._editClasificados(this.idEdit,formData).subscribe(
      (resp:any) =>{
        $("#editar").modal('hide');
        this.getClasificacidos();
        this.alertService.msg('OK',resp.msj);        
      },
      error => {
        if(error.msj != null){
          this.alertService.msg('ERR',error.msj);
        }

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

  deleteClasificado(id:number){
    this.clasificadoServices._deleteClasificados(id).subscribe(
      (resp:any) => {
        this.getClasificacidos();
        this.alertService.msg('OK',resp.msj);        
      },
      error => {      
        if(error.message != null){
          this.alertService.msg('ERR',error.message);
        }       
      }
    )
  }



}
