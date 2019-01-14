import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-productos-carousel-page',
  templateUrl: './productos-carousel-page.component.html',
  styleUrls: ['./productos-carousel-page.component.css']
})
export class ProductosCarouselPageComponent implements OnInit {
  @Input('items') items: Producto[];

  products: Producto[] ;
  kilogramos: Array<any> = [];
  colorTres: any;
  itemToBuy: Producto;
  precio: any;
  constructor(
    private carritoService: CarritoService,
    private toastr: AlertsService
  ) { }

  ngOnInit() {
    this.products= [...this.items]; // cargando los productos a nuevo array


  }


  incrase(item: Producto, action): void {
    if (action) {
      item.cantidad++;
    } else {
      if (item.cantidad > 1)
        item.cantidad--;
    }
  }

  addItem(item: Producto): void {

    this.carritoService.addItem(item.codeProdSys, item.nombre, item.marca, item.cantidad, item.precioL1);


    this.toastr.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${item.nombre}' al carrito de compras`); item.cantidad = 1;
  }
  selectAgrupacion(i:number, j:number=null){   // cambiando datos al producto de la  agrupacion seleccionada
    if(j!=null){
      this.products[i].nombre =  this.products[i].listAgrupacion[j].nombre;
      this.products[i].precioL1 =  this.products[i].listAgrupacion[j].precioL1;
      this.products[i].codeProdSys =  this.products[i].listAgrupacion[j].codeProdSys;
      this.products[i].urlImage = this.products[i].listAgrupacion[j].urlImage;
    }
  }

}
