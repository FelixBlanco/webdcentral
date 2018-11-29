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

  colorTres: any;
  constructor(
    private carritoService: CarritoService, 
    private toastr: AlertsService
  ) { }

  ngOnInit() { }

  incrase(item: Producto, action): void{
    if(action){
      item.cantidad++;
    }else{
      if(item.cantidad > 1)
        item.cantidad--;
    }
  }

  addItem(item: Producto): void{
    this.carritoService.addItem(item.codeProdSys, item.nombre, item.marca, item.cantidad, item.defaultPrice);
    this.toastr.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${item.nombre}' al carrito de compras`); 
    item.cantidad = 1;
  }
}
