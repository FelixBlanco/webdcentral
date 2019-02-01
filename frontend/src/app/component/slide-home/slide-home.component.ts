import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService }  from '../../services/galeria-home.service';
import { ConfigColorService } from '../../services/config-color.service';
import { ProductosService , Producto } from '../../services/productos.service';
import { ProductsBehaviorService} from '../../services/products-behavior.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slide-home',
  templateUrl: './slide-home.component.html',
  styleUrls: ['./slide-home.component.css']
})
export class SlideHomeComponent implements OnInit {

  listSlide:any;
  colorDos:any =  null;
  first:any[]=null;

  constructor(
    private _galeriaHomeService:GaleriaHomeService,
    private _color: ConfigColorService,
    private productService: ProductosService,
    private router: Router,
    private producBehaviourService: ProductsBehaviorService

  ) { }

  ngOnInit() {
    this.getSlide()

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorDos = resp.colorMedio;
        }        
      }
    );
  }

  getSlide(){
    this._galeriaHomeService._getSlideHome().subscribe(
      (resp:any) => {
        if(resp != null){
          this.listSlide = resp.producto; // todo los slide        
          this.first = this.listSlide[0]; // agregamos el primero
          this.listSlide.shift(); // Eliminamos el primero de la lista   
        }
        console.log('cantidad de slide',this.listSlide.length)        
      }
    )
    
  }
  Accion(prod:any){
    console.log(prod);
    // redirigir a productos y buscar dicho producto solo si existe
    if(prod.fk_idProducto){
         const producto:Producto= prod.producto;
     const listProd:Producto[]= [producto];
    this.router.navigate(['/productos']);
    setTimeout(() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }), 1000);
    this.producBehaviourService.updateSource(listProd);  
    }
  }
}
