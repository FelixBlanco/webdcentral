import { Component, OnInit } from '@angular/core';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto } from 'src/app/services/productos.service';
import { RubrosService } from 'src/app/services/rubros.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productsList: Producto[];
  rubrosList: any[];

  constructor(
    private productsBehavior: ProductsBehaviorService,
    private rubrosService: RubrosService,
    private as: AlertsService
  ) { }

  ngOnInit() {
    this.iniBehavior();
    this.setRubros();
  }

  setProducts(products: Producto[]): void{
    products.forEach( (product) => {
      product.cantidad = !product.cantidad ? 0 : product.cantidad;
    })
    this.productsList = products
  }

  iniBehavior() : void{
    this.productsBehavior.productsItems.subscribe( (products: Producto[]) => {
      this.setProducts(products);
    });
  }

  setRubros(){
    this.rubrosService.getRubros().subscribe((resp) => {
      if(resp.status === 202){
        this.rubrosList = resp.body;
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Rubros');
        //TODO err
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Rubros');
    })
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

  filterProducts(){
    
  }

}
