import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService, Producto, CarouselItem } from 'src/app/services/productos.service';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';


@Component({
  selector: 'app-destacado-inicio',
  templateUrl: './destacado-inicio.component.html',
  styleUrls: ['./destacado-inicio.component.css']
})
export class DestacadoInicioComponent implements OnInit {

  destacadosList: Producto[];
  colorTres:any;

  carouselItems: CarouselItem[] = [];

  aTimeOutFix: boolean = false;

  constructor(
    private productosService: ProductosService, 
    private carouselConfig: NgbCarouselConfig, 
    private ts: AlertsService,
    private productsBehavior: ProductsBehaviorService
  ) { 
    this.carouselConfig.interval = 5000;
    this.carouselConfig.showNavigationArrows = true;
  }

  ngOnInit() {
    this.setDestacadosList();
  }

  setDestacadosList(){
    this.productosService.getDestacados().subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.mapAndSet(resp.body);
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, error => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    });
  }

  mapAndSet(data: any) {
    
    if(!data || !data.destacados){
      this.destacadosList = [];
      return;
    }

    const destacados: any[] = data.destacados;

    let toSet: Producto[] = [];

    destacados.forEach((item) => {
      item.producto.cantidad = 1;
      toSet.push(item.producto);
    });

    this.productsBehavior.parseDefaultPrice(toSet).then(value => {
      this.destacadosList = value
      this.generateCarousel();
     })
    
  }

  generateCarousel(){
    if(!this.destacadosList){
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.destacadosList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, products: this.getPartialItems(i,i+3)});
      }
    });
    
    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=> this.aTimeOutFix = true,1000); // :(
  }

  isACarruselItem($index): boolean {
    if($index % 4){
      return false;
    }
    return true;
  }


  getPartialItems(from, to): Producto[]{
    let items: Producto[] = [];

    this.destacadosList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }
}
