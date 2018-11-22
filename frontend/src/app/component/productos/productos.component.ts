import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto, ProductosService, CarouselItem } from 'src/app/services/productos.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {


  productsList: Producto[];

  inPromise: boolean;

  currentPage: number;
  pages: number;

  tittleList: string;

  carouselItems: CarouselItem[] = [];

  constructor(
    private productsBehavior: ProductsBehaviorService,
    private productosService: ProductosService,
    private route: ActivatedRoute
  ) { 
    this.pages = 0;
  }

  ngOnInit() {
    this.iniBehavior();
    this.iniTittleBehavior();
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe(param => {
      if(param && param.scroll){
        setTimeout(()=> document.getElementById('productos').scrollIntoView({behavior: 'smooth'}),1000);
        console.log('params',param);
      }
    })
  }

  iniTittleBehavior(){
    this.productosService.productosFilterTittle.subscribe(val => this.tittleList = val);
  }

  generateCarousel(){
    if(!this.productsList){
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.productsList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, products: this.getPartialItems(i,i+7)});
      }
    });

    this.pages = this.carouselItems.length;

  }

  isACarruselItem($index): boolean {
    if($index % 8){
      return false;
    }
    return true;
  }

  getPartialItems(from, to): Producto[]{
    let items: Producto[] = [];

    this.productsList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

  setProducts(products: Producto[]): void{
    products.forEach( (product) => {
      product.cantidad = !product.cantidad ? 1 : product.cantidad;
    })
    this.productsList = products;

    this.generateCarousel();
  }

  iniBehavior() : void{
    this.productsBehavior.productsItems.subscribe( (products: Producto[]) => {
      this.productsList = [];
      this.setProducts(products);
    });
  }

  setCurrent({current}){
    if(current)
    this.currentPage = current
  }

}
