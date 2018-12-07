import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/services/productos.service';
import { GaleryProductService, GaleryProduct } from 'src/app/services/galery-product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-productos-inicio',
  templateUrl: './productos-inicio.component.html',
  styleUrls: ['./productos-inicio.component.css']
})

export class ProductosInicioComponent implements OnInit {
  
  galeryList: GaleryProduct[] = [];
  colorTres:any;

  carouselItems: CarouselItem[] = [];

  aTimeOutFix: boolean = false;
  
  inPromise: boolean;


  constructor(
    private galeryProductService: GaleryProductService, 
    private carouselConfig: NgbCarouselConfig, 
    private ts: AlertsService
  ) { 
    this.carouselConfig.interval = 5000;
    this.carouselConfig.showNavigationArrows = true;
  }

  ngOnInit() {
    this.setProductosHomeList();
  }

  setProductosHomeList(){
    this.inPromise = true;
    this.galeryProductService.getAll().subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.galeryList = resp.body.galeria;
        this.generateCarousel();
      }else{
        this.inPromise = false;
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, (error) => {
      this.inPromise = false;
      console.error(error);
      this.ts.msg("ERR", "Error", `Ha ocurrido un error interno`);
    });
  }

  generateCarousel(){
    if(!this.galeryList.length){
      this.inPromise = false;
      return;
    }

    let aux: GaleryProduct[] = [];

    //Para tener solo los items que tienen estatus activo
    this.galeryList.forEach(val => {
      if(val.fk_idStatusSistema === 1){
        aux.push(val);
      }
    });

    this.galeryList =  [...aux];

    this.carouselItems = [];
    let index: number = 1;
    this.galeryList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, items: this.getPartialItems(i,i+3)});
      }
    });
    this.inPromise = false;
    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=> this.aTimeOutFix = true,1000); // :(
  }

  isACarruselItem($index): boolean {
    if($index % 4){
      return false;
    }
    return true;
  }


  getPartialItems(from, to): GaleryProduct[]{
    let items: GaleryProduct[] = [];

    this.galeryList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

}
