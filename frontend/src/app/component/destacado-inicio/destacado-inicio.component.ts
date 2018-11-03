import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import * as $ from 'jquery';

export interface DestacadoItem{
  nombre: string;
  urlImage: string;
  codeProdSys: string;
  kiloProdcuto: string;
  precio: number;
  marca: string;
  descripcion?: string;
  cantidad: number;
}

@Component({
  selector: 'app-destacado-inicio',
  templateUrl: './destacado-inicio.component.html',
  styleUrls: ['./destacado-inicio.component.css']
})
export class DestacadoInicioComponent implements OnInit {

  destacados: DestacadoItem[];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getDestacados().subscribe(resp => {
      console.log(resp);
      if(resp.ok && resp.status === 200){
        this.mapAndSet(resp.body);
      }else{
        // TODO Ha ocurrido un error;
      }
    }, error => {
      // TODO Ha ocurrido un error
    });
  }

  mapAndSet(data: any) : void {
    
    const destacados: any[] = data.destacados;

    if(!destacados.length){
      // TODO No hay destacados
      return;
    }

    let toSet: DestacadoItem[] = [];

    destacados.forEach((item) => {
      const producto = item.producto;

      toSet.push({
        codeProdSys: producto.codeProdSys,
        nombre: producto.nombre,
        //descripcion: producto.descripcion,
        urlImage: producto.urlImage,
        kiloProdcuto: producto.kiloProdcuto,
        precio: producto.precioL2,
        marca: producto.marca,
        cantidad: 1
      });
    });

    this.destacados = toSet;
    //TODO $('.carousel').carousel();
    console.table(this.destacados);

  }

  isACarruselItem($index): boolean {
    if($index % 4){
      return false;
    }
    return true;
  }


  getPartialItems(from, to): DestacadoItem[]{
    let items: DestacadoItem[] = [];

    this.destacados.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }
}
