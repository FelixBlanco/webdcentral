import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';
import { AlertsService } from '../../services/alerts.service'

@Component({
  selector: 'app-config-footer',
  templateUrl: './config-footer.component.html',
  styleUrls: ['./config-footer.component.css']
})
export class ConfigFooterComponent implements OnInit {
  
  data:any = {
    idConfigFooter:null,
    direccion: null, 
    mail: null, nroContacto: null,
    mail1: null, mail2: null,
    latitud: null, longitud: null,
    whatsApp1: null, whatsApp2: null,
    horarios:null , subtes: null, colectivos: null,
    avenidas: null, listaPrecio: null, desde: null, hasta: null, url_mercado_libre: null
    };


  constructor(
    private _confgFooterService:ConfgFooterService,
    private _alertService: AlertsService
  ) { }

  ngOnInit() {
    this.getConfigFooter();
    
  }

  getConfigFooter(){
    this._confgFooterService._getConfigFooter().subscribe(
      resp => { 
        if(resp){
          this.data = resp;
        }
      }
    )
  }

  upgradeCondigFooter(){ console.log(this.data)
    this._confgFooterService._upgradeConfigFooter(this.data).subscribe(
      (resp:any) => { this.getConfigFooter();  this._alertService.msg("OK",resp.msj); },
      error => { 
        console.log( error );
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
