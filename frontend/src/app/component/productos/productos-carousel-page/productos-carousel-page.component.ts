import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ConfigColorService } from 'src/app/services/config-color.service';

@Component({
  selector: 'app-productos-carousel-page',
  templateUrl: './productos-carousel-page.component.html',
  styleUrls: ['./productos-carousel-page.component.css']
})
export class ProductosCarouselPageComponent implements OnInit {
  @Input('items') items: Producto[];

  colorTres: any;
  constructor(private carritoService: CarritoService, private toastr: AlertsService, private c : ConfigColorService) { }

  ngOnInit() {
    this.c._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorTres = resp.colorClaro;
        }        
      }
    );
  }

  incrase(item: Producto, action): void{
    if(action){
      item.cantidad++;
    }else{
      if(item.cantidad > 1)
        item.cantidad--;
    }
  }

  addItem(item: Producto): void{
    this.carritoService.addItem(item.codeProdSys, item.nombre, item.marca, item.cantidad, item.precioL2);
    this.toastr.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${item.nombre}' al carrito de compras`); //TODO wtf?
    item.cantidad = 1;
  }
}
