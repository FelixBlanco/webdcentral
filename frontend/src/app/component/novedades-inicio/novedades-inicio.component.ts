import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SuscripcionService } from '../../services/suscripcion.service'
import { AlertsService } from '../../services/alerts.service'

@Component({
  selector: 'app-novedades-inicio',
  templateUrl: './novedades-inicio.component.html',
  styleUrls: ['./novedades-inicio.component.css']
})
export class NovedadesInicioComponent implements OnInit {

  f_sus: FormGroup;

  constructor(
    private sus: SuscripcionService,
    private fb: FormBuilder,
    private ms: AlertsService
    ) { 
      this.f_sus = this.fb.group({
        'novedad' : ['', Validators.required]
      })
    }

  ngOnInit() {
  }

  addSus(){
    const v = this.f_sus.value;
    const data: any = { email : v.novedad }
    this.sus._addSus(data).subscribe(
      (resp:any) => {
        this.ms.msg('OK',resp.msj)
      },
      error =>{
        this.ms.msg("ERR", "Info", `Info: ${error.error.errors.email}`);
      }
    )
  }

}
