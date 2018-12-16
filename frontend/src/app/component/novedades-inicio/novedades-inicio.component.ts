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

  inPromise: boolean;

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
    this.inPromise = true;
    const v = this.f_sus.value;
    const data: any = { email : v.novedad }
    this.sus._addSus(data).subscribe(
      (resp:any) => {
        this.ms.msg('OK',resp.msj)
        this.inPromise = false;
      },
      error =>{
        this.inPromise = false;

        if(error.error.message != null){
          this.ms.msg("ERR", "Error", `Error: ${error.error.message}`);  
        }

        if(error.error.errors.email != null){
          this.ms.msg("ERR", "Error", `Error: ${error.error.errors.email}`);  
        }        
      
        
      
      }
    )
  }

}
