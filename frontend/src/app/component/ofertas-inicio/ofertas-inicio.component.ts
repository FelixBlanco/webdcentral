import { Component, OnInit } from '@angular/core';
import { OfertasInicioService } from '../../services/ofertas-inicio.service'
import { ConfgFooterService } from '../../services/confg-footer.service'
import { CuponesService } from '../../services/cupones.service'
import { ProductosService , Producto } from '../../services/productos.service';
import { ProductsBehaviorService} from '../../services/products-behavior.service';
import { Router } from '@angular/router';

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
    private cuponesService : CuponesService,
    private productService: ProductosService,
    private router: Router,
    private producBehaviourService: ProductsBehaviorService    
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
        this.actCupones();    
      }
    )
  }

  actCupones(){    
    if(this.uso_cupon == 1){
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

  goToProduct(prod:any){
      const producto:Producto= prod.producto;
      const listProd:Producto[]= [producto];
      this.router.navigate(['/productos']);
      setTimeout(() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }), 1000);
      this.producBehaviourService.updateSource(listProd); 
    }
  

}
