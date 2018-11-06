import { Component, OnInit } from '@angular/core';
import { OfertasInicioService } from '../../services/ofertas-inicio.service'

@Component({
  selector: 'app-ofertas-inicio',
  templateUrl: './ofertas-inicio.component.html',
  styleUrls: ['./ofertas-inicio.component.css']
})
export class OfertasInicioComponent implements OnInit {

  listOfertas:any; 

  constructor(
    private ofertaInicio : OfertasInicioService
  ) { }

  ngOnInit() {
    this.ofertaInicio.getOfertas().subscribe(
      resp => {
        this.listOfertas = resp; 
      }
    )
  }


}
