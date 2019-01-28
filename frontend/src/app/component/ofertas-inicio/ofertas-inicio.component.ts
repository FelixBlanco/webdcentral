import { Component, OnInit } from '@angular/core';
import { OfertasInicioService } from '../../services/ofertas-inicio.service'
import { ConfgFooterService } from '../../services/confg-footer.service'
import { CuponesService } from '../../services/cupones.service'

declare var $:any;

@Component({
  selector: 'app-ofertas-inicio',
  templateUrl: './ofertas-inicio.component.html',
  styleUrls: ['./ofertas-inicio.component.css']
})
export class OfertasInicioComponent implements OnInit {

  listOfertas:any; 
  uso_cupon:number;
  lista_cupones:any;
  condiciones:any;

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
        console.log('copon', resp)      
        this.uso_cupon = resp.uso_cupon_web    
        this.actCupones();    
      }
    )
  }

  actCupones(){    
    console.log('status uso cupon', this.uso_cupon)
    if(this.uso_cupon){
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

  openCondicion(info:any,es:string){
    this.condiciones = info.base_cond;    
    $('#concionesModal').modal('show');
  }

}
