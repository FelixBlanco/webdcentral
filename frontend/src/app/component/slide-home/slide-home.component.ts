import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService }  from '../../services/galeria-home.service';
import { ConfigColorService } from '../../services/config-color.service';
import { ProductosService , Producto } from '../../services/productos.service';
import { ProductsBehaviorService} from '../../services/products-behavior.service';
import { Router } from '@angular/router';

declare var $:any;

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
        console.log('info slide ', resp)
        if(resp != null){
          this.listSlide = resp.producto; // todo los slide        
          this.first = this.listSlide[0]; // agregamos el primero
          this.listSlide.shift(); // Eliminamos el primero de la lista   
        }        
      }
    )
    
  }
  Accion(prod:any){
    console.log('Accion del slide',prod);
    /**
     * PAGINAS
     * Inicio, Oferta,Blog, Envios
     * 
     * #modal
     * mascotas, Marcas, servicios, Contactanos
     */
    console.log('id producto',prod.fk_idProducto)
    console.log('seccion de la pagina',prod.seccion_pagina)

    if(prod.fk_idProducto != 0){ // Redirecciona a los productos
      console.log('producto slide')
      const producto:Producto= prod.producto;
      const listProd:Producto[]= [producto];
      this.router.navigate(['/productos']);
      setTimeout(() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }), 1000);
      this.producBehaviourService.updateSource(listProd);  
    } else if(prod.seccion_pagina.link != 'null'){ // Seccion de la Pagina
      console.log('esto es un links de la pagina',prod.seccion_pagina.link);
       this.router.navigate([prod.seccion_pagina.link]);
    } else if(prod.seccion_pagina.modal != null){ // Seccion de la modal
      console.log('esto es el modal',prod.seccion_pagina.modal);
      $(prod.seccion_pagina.modal).modal('show');
    }
  }
}
