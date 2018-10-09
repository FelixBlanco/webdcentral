import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  footer_data:any = {
    direccion: null, 
    nro_contacto: null, 
    email: null
  };

  constructor(
    private _configFooterService:ConfgFooterService
  ) { }

  ngOnInit() {
    this.getConfigFooter();
  }

  getConfigFooter(){
    this._configFooterService._getConfigFooter().subscribe(
      resp => {
        if(resp != null){
          this.footer_data = resp;
        }else{
          this.footer_data = {
            direccion: null, 
            nro_contacto: null, 
            email: null
          };
        }
      }
    );
}}
