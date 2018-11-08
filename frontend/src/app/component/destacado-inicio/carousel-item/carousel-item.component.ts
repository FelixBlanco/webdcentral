import { Component, OnInit, Input } from '@angular/core';
import { DestacadoItem } from '../destacado-inicio.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ConfigColorService } from 'src/app/services/config-color.service';


@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {

  @Input('items') items: DestacadoItem[];

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
