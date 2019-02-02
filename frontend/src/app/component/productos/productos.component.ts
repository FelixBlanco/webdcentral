import { Component, OnInit } from '@angular/core';

import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto, ProductosService, CarouselItem } from 'src/app/services/productos.service';
import { ConfigColorService } from '../../services/config-color.service';

declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  nrSelect=19;
  productsList: Producto[];
  chargeCarrousel: boolean;
  inPromise: boolean;
  max:number =19;
  currentPage: number;
  pages: number;

  tittleList: string;

  carouselItems: CarouselItem[] = [];
  list_arbol_p:any;
  colorUno:any;
  colorTres:any;

  constructor(
    private productsBehavior: ProductsBehaviorService,
    private productosService: ProductosService,
    private _color: ConfigColorService
  ) { 
    this.pages = 0;
    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
          this.colorTres = resp.colorClaro;
        }        
      }
    );    
  }

  ngOnInit() {
    this.iniBehavior();
    this.iniTittleBehavior();
    this.getArbolProductos();
  }

  clickMenu(id:any){
    const idNombre = '#posicion_'+id;
    $(idNombre).parent().find("ul.desplegado").toggle('fast'); 
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
        this.carouselItems.push({id: index++, products: this.getPartialItems(i,i+this.max)});
      }
      
    });
   
    this.pages = this.carouselItems.length;
    console.log(this.carouselItems.length);

  }

  isACarruselItem(index): boolean {
    if(index % (this.max+1)){
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
  MaxRangePartialItem(max:string){
    
    this.max=Number(max);
    console.log(this.max);
     this.generateCarousel(); 
  }

  getArbolProductos(){
    this.productosService._getArbolProductos().subscribe(
      resp => {
        this.list_arbol_p = resp;              
      }
    )
  }

}
