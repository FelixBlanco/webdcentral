import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';
import { AlertsService } from '../../services/alerts.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-config-footer',
  templateUrl: './config-footer.component.html',
  styleUrls: ['./config-footer.component.css']
})
export class ConfigFooterComponent implements OnInit {
  myForm: FormGroup;
  isPromise:boolean;

  constructor(
    private _confgFooterService:ConfgFooterService,
    private _alertService: AlertsService,
    private fb: FormBuilder
  ) { 
    this.myForm = this.fb.group({
      direccion     : ['',Validators.required],
      nroContacto   : ['',Validators.required],
      mail1         : ['',Validators.required],
      mail2         : ['',Validators.email],
      latitud       : ['',Validators.required],
      longitud      : ['',Validators.required],
      whatsApp1     : ['',Validators.required],
      whatsApp2     : [''],
      horarios      : [''],
      subtes        : [''],
      colectivos    : [''],
      avenidas      : [''],
      listaPrecio   : [Validators.min(1),Validators.max(9)],
      desde         : [''],
      hasta         : [''],
      url_mercado_libre: [''],
      link_otra_pagina: [''],      
    })
  }

  ngOnInit() {
    this.getConfigFooter();
    
  }

  getConfigFooter(){
    this._confgFooterService._getConfigFooter().subscribe(
      (resp:any) => { 
        if(resp){
          this.myForm.setValue({
            direccion : resp.direccion,
            nroContacto : resp.nroContacto,
            mail1 : resp.mail1,
            mail2 : resp.mail2,
            latitud : resp.latitud,
            longitud  : resp.longitud,
            whatsApp1 : resp.whatsApp1,
            whatsApp2 : resp.whatsApp2,
            horarios  : resp.horarios,
            subtes  : resp.subtes,
            colectivos  : resp.colectivos,
            avenidas  : resp.avenidas,
            listaPrecio : resp.listaPrecio,
            desde : resp.desde,
            hasta : resp.hasta,
            url_mercado_libre : resp.url_mercado_libre,
            link_otra_pagina : resp.link_otra_pagina,
          })          
        }
      }
    )
  }

  upgradeCondigFooter(){
    this.isPromise=true;
    const val = this.myForm.value; 
    this._confgFooterService._upgradeConfigFooter(val).subscribe(
      (resp:any) => { this.isPromise=false; this.getConfigFooter();  this._alertService.msg("OK",resp.msj); },
      error => { 
                
        this.isPromise = false;
        
        if(error.error.errors.direccion != null){
          this._alertService.msg("ERR", error.error.errors.direccion);
        }

        if(error.error.errors.nroContacto != null){
          this._alertService.msg("ERR", error.error.errors.nroContacto);
        }
       
        if(error.error.errors.mail1 != null){
          this._alertService.msg("ERR", error.error.errors.mail1);
        }

        if(error.error.errors.latitud != null){
          this._alertService.msg("ERR", error.error.errors.latitud);
        }

        if(error.error.errors.longitud != null){
          this._alertService.msg("ERR", error.error.errors.longitud);
        }

        if(error.error.errors.whatsApp1 != null){
          this._alertService.msg("ERR", error.error.errors.whatsApp1);
        }

        if(error.error.errors.horarios != null){
          this._alertService.msg("ERR", error.error.errors.horarios);
        }        
        
        if(error.error.errors.subtes != null){
          this._alertService.msg("ERR", error.error.errors.subtes);
        }

        if(error.error.errors.colectivos != null){
          this._alertService.msg("ERR", error.error.errors.colectivos);
        }   

        if(error.error.errors.avenidas != null){
          this._alertService.msg("ERR", error.error.errors.avenidas);
        }

        if(error.error.errors.listaPrecio != null){
          this._alertService.msg("ERR", error.error.errors.listaPrecio);
        }    
        
        if(error.error.errors.desde != null){
          this._alertService.msg("ERR", error.error.errors.desde);
        }    
        
        if(error.error.errors.hasta != null){
          this._alertService.msg("ERR", error.error.errors.listaPrecio);
        }    
        
        if(error.error.errors.url_mercado_libre != null){
          this._alertService.msg("ERR", error.error.errors.url_mercado_libre);
        }            
                 
      }
    );
  }
}
