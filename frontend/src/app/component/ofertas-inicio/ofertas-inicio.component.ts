import { Component, OnInit } from '@angular/core';
import { OfertasInicioService } from '../../services/ofertas-inicio.service'
import { ConfgFooterService } from '../../services/confg-footer.service'
import { CuponesService } from '../../services/cupones.service'


@Component({
  selector: 'app-ofertas-inicio',
  templateUrl: './ofertas-inicio.component.html',
  styleUrls: ['./ofertas-inicio.component.css']
})
export class OfertasInicioComponent implements OnInit {

  listOfertas:any; 
  uso_cupon:boolean;
  lista_cupones:any;

  constructor(
    private ofertaInicio : OfertasInicioService,
    private configFooterService : ConfgFooterService,
    private cuponesService : CuponesService
  ) { }

  ngOnInit() {

    this.ofertaInicio.getOfertas().subscribe(
      resp => {
        this.listOfertas = resp; 
      }
    )

    this.configFooterService._getConfigFooter().subscribe(
      (resp:any) => {
        this.uso_cupon = resp.uso_cupon_web
      }
    )
    
    this.actCupones();
    
  }

  actCupones(){    
    if(this.uso_cupon == true){
      this.getCupones();
    }
  }

  getCupones(){
    this.cuponesService.getAll().subscribe(
      (resp:any) => {
        this.lista_cupones = resp.cupones;
      }
    )
  }


}
