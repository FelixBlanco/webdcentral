import { Component, OnInit, Input } from '@angular/core';
import { DestacadoItem } from '../destacado-inicio.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {

  @Input('items') items: DestacadoItem[];
  @Input('isActive') isActive: boolean;

  constructor(private carritoService: CarritoService, private toastr: AlertsService) { }

  ngOnInit() {
  }

  incrase(item: DestacadoItem, action): void{
    if(action){
      item.cantidad++;
    }else{
      if(item.cantidad > 1)
        item.cantidad--;
    }
  }

  addItem(item: DestacadoItem): void{
    this.carritoService.addItem(item.codeProdSys, item.nombre, item.marca, item.cantidad, item.precio);
    this.toastr.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${item.nombre}' al carrito de compras`); //TODO wtf?
    item.cantidad = 1;
  }

}
