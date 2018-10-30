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
      direccion: null, 
      nroContacto: null, 
      email: null
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

  upgradeCondigFooter(){
    this._confgFooterService._upgradeConfigFooter(this.data).subscribe(
      resp => { this.getConfigFooter();  this._alertService.msg("OK","Éxito", "Actualizacion exitosa"); },
      error => { this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`); }
    );
  }
}
