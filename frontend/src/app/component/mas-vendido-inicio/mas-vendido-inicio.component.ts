import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto, CarouselItem } from 'src/app/services/productos.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-mas-vendido-inicio',
  templateUrl: './mas-vendido-inicio.component.html',
  styleUrls: ['./mas-vendido-inicio.component.css']
})
export class MasVendidoInicioComponent implements OnInit {

  masVendidoList: Producto[];
  colorTres:any;

  carouselItems: CarouselItem[] = [];

  constructor(
    private productosService: ProductosService, 
    private carouselConfig: NgbCarouselConfig, 
    private ts: AlertsService
  ) { 
    this.carouselConfig.interval = 5000;
    this.carouselConfig.showNavigationArrows = true;
  }

  ngOnInit() {
    this.setDestacadosList();
  }

  setDestacadosList(){
    this.productosService.getMasVendido().subscribe(resp => {
      console.log('mas vendido', resp);
      if(resp.ok && resp.status === 200){
        this.masVendidoList = resp.body;
        this.generateCarousel();
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, error => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    });
  }

  generateCarousel(){
    if(!this.masVendidoList){
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.masVendidoList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, products: this.getPartialItems(i,i+3)});
      }
    });

  }

  isACarruselItem($index): boolean {
    if($index % 4){
      return false;
    }
    return true;
  }


  getPartialItems(from, to): Producto[]{
    let items: Producto[] = [];

    this.masVendidoList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

}
