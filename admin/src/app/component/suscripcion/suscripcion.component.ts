import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertsService } from '../../services/alerts.service'
import { SuscripcionService } from  '../../services/suscripcion.service'

declare var $;

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {

  list_suscrito:any; list_suscrito_canceladas:any;
  
  idDelete:number;

  motivo: FormGroup

  constructor(
    private sus:SuscripcionService,
    private al: AlertsService,
    private fb: FormBuilder
  ) { 
    this.motivo = this.fb.group({
      'motivoDeCancelacion' : ['',Validators.required]
    })
  }

  ngOnInit() {
    this.getS();
    this.getSC();
  }

  getS(){
    this.sus._getSuscripciones().subscribe(
      (resp:any) => {
        this.list_suscrito = resp.suscripcion
      }
    )
  }

  getSC(){
    this.sus._getSuscripcionesCanceladas().subscribe(
      (resp:any) => {
        this.list_suscrito_canceladas = resp.suscripcion
      }
    )
  }

  deleteSPregunta(id:number){
    this.idDelete = id;
    $("#exampleModal").modal('show');
  }

  deleteS(){
    const data:any = { id: this.idDelete, motivoDeCancelacion: this.motivo.value.motivoDeCancelacion } 
    this.sus._deleteSuscripciones(data).subscribe(
      (resp:any) => {
        this.getS();
        this.getSC();
        $("#exampleModal").modal('hide');
        this.al.msg('OK',resp.msj)
      },
      error => {
        this.al.msg('ERR',error.error.errors)
      }
    )
  }

}
