import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service'

@Component({
  selector: 'app-minorista',
  templateUrl: './minorista.component.html',
  styleUrls: ['./minorista.component.css']
})
export class MinoristaComponent implements OnInit {

  url:any = null;

  constructor(private c_f:ConfgFooterService) { }

  ngOnInit() {

    this.c_f._getConfigFooter().subscribe(
      (resp:any) =>{
        if(resp){
          console.log(resp)
          this.url = resp.link_otra_pagina;
        }        
      }
    )

    if(!this.url){
      this.url = '#';
    }
  }

}
