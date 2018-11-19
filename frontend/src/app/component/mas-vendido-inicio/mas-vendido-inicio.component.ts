import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { MasVendidoService } from '../../services/mas-vendido.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';

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
  selector: 'app-mas-vendido-inicio',
  templateUrl: './mas-vendido-inicio.component.html',
  styleUrls: ['./mas-vendido-inicio.component.css']
})
export class MasVendidoInicioComponent implements OnInit {


  
  counts:any ={
    uno: { count: 1 },
    dos: { count: 1 },
    tres: { count: 1 },
    cuatro: { count: 1 },
    cinco: { count: 1 },
    seis: { count: 1 },
    siete: { count: 1 },
    ocho: { count: 1 },
  }

  destacados: DestacadoItem[];
  colorTres:any;

  constructor(
    private productosService: ProductosService,
    private masVendidoService: MasVendidoService, 
    private carouselConfig: NgbCarouselConfig, 
    private ts: AlertsService) { 
    this.carouselConfig.interval = 5000;
    this.carouselConfig.pauseOnHover = true;
    this.carouselConfig.showNavigationIndicators = false;
  }

  ngOnInit() {
    /*this.masVendidoService.getMasVendido().subscribe((resp:any) => {
      if(resp.ok && resp.status === 200){
        this.mapAndSet(resp.body);
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, error => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    });*/
  }

  mapAndSet(data: any) : void {
    
    if(!data || !data.destacados){
      this.destacados = [];
      return;
    }

    const destacados: any[] = data.destacados;

    let toSet: DestacadoItem[] = [];

    destacados.forEach((item) => {
      const producto = item.producto;

      toSet.push({
        codeProdSys: producto.codeProdSys,
        nombre: producto.nombre,
        urlImage: producto.urlImage,
        kiloProdcuto: producto.kiloProdcuto,
        precio: producto.precioL2,
        marca: producto.marca,
        cantidad: 1
      });
    });

    this.destacados = toSet;
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

  mas(p:string){
    this.counts[p].count++;
  }

  menos(p:string){
    if(this.counts[p].count != 0){
      this.counts[p].count--;
    }
  }

}
