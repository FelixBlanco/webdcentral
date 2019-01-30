import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SuscripcionService } from '../../services/suscripcion.service'
import { AlertsService } from '../../services/alerts.service'
import { ConfigColorService } from '../../services/config-color.service';

@Component({
  selector: 'app-novedades-inicio',
  templateUrl: './novedades-inicio.component.html',
  styleUrls: ['./novedades-inicio.component.css']
})
export class NovedadesInicioComponent implements OnInit {

  f_sus: FormGroup;

  inPromise: boolean;
  colorTres:any;
  colorUno:any;

  constructor(
    private sus: SuscripcionService,
    private fb: FormBuilder,
    private ms: AlertsService,
    private _color: ConfigColorService
    ) { 
      this.f_sus = this.fb.group({
        'novedad' : ['', Validators.email]
      })
    }

  ngOnInit() {
    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
          this.colorTres = resp.colorClaro;
        }        
      }
    );    
  }

  addSus(){
    this.inPromise = true;
    const email = this.f_sus.value.novedad
    this.sus._addSus( email ).subscribe(
      (resp:any) => {
        this.ms.msg('OK',resp.msj)
        this.inPromise = false;
      },
      error =>{ console.log(error)
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
