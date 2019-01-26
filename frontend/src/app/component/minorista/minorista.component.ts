import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service'
import { ConfigColorService } from '../../services/config-color.service';

@Component({
  selector: 'app-minorista',
  templateUrl: './minorista.component.html',
  styleUrls: ['./minorista.component.css']
})
export class MinoristaComponent implements OnInit {

  url:any = null;
  colorTres:any;
  colorUno:any;

  constructor(private c_f:ConfgFooterService,private colores : ConfigColorService) { }

  ngOnInit() {

    this.colores._paletaColor().subscribe(
      (resp:any) => {
        this.colorUno   = resp.colorOscuro
        this.colorTres  = resp.colorClaro
      }
    )

    this.c_f._getConfigFooter().subscribe(
      (resp:any) =>{
        if(resp){
          this.url = resp.link_otra_pagina;
        }        
      }
    )
  }

}
