import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'
import { AlertsService } from '../../services/alerts.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
declare var $;

@Component({
  selector: 'app-reclamos-inicio',
  templateUrl: './reclamos-inicio.component.html',
  styleUrls: ['./reclamos-inicio.component.css']
})
export class ReclamosInicioComponent implements OnInit {
  
  myForm:FormGroup;

  constructor(private _reclamosSugerenciasService: ReclamosSugerenciasService, private _alertService:AlertsService , private fb:FormBuilder) {
    this.myForm = this.fb.group({
      'titulo'      :['',Validators.required],
      'descripcion' :['',Validators.required]
    })
   }

  ngOnInit() {}


  clickModal(){
    if(localStorage.getItem('access_token') != null){
      $("#reclamoModel").modal('show');
    }
  }
  
  addReclamos(){
    const userId = JSON.parse( localStorage.getItem('user_data') ); // recuperamos el id del usuario
    const val = this.myForm.value;
    const data: any = { titulo: val.titulo, descripcion: val.descripcion, fk_idUser: userId.id, fk_idStatusReclamo: 1 }
    this._reclamosSugerenciasService._addReclamos(data).subscribe(
      (resp:any) => {
        $("#reclamoModel").modal('hide');
        this._alertService.msg('OK',resp.msj); 
      },
      error => {
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

}
