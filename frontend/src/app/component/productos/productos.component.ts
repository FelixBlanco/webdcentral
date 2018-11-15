import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto, ProductosService } from 'src/app/services/productos.service';
import { RubrosService } from 'src/app/services/rubros.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  productsList: Producto[];
  rubrosList: any[];
  subRubrosAList: any[];
  subRubrosBList: any[];

  filterForm: FormGroup;
  inPromise: boolean;

  currentPage: number;
  pages: number;


  constructor(
    private productsBehavior: ProductsBehaviorService,
    private rubrosService: RubrosService,
    private as: AlertsService,
    private fb: FormBuilder,
    private productosService: ProductosService
  ) { 

    this.filterForm = this.fb.group({
      rubro: [''],
      subRubroA: [''],
      subRubroB: [''],
    });

    this.pages = 0;
    
  }

  ngOnInit() {
    this.iniBehavior();
    this.setRubros();
  }

  setProducts(products: Producto[]): void{
    products.forEach( (product) => {
      product.cantidad = !product.cantidad ? 1 : product.cantidad;
    })
    this.productsList = products;

    this.currentPage = 1;
    this.pages = 0;
    this.setTotalPages();
  }

  iniBehavior() : void{
    this.productsBehavior.productsItems.subscribe( (products: Producto[]) => {
      this.productsList = [];
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
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Rubros');
    });

    this.rubrosService.getSubrubroA().subscribe((resp) => {
      if(resp.status === 202){
        this.subRubrosAList = resp.body;
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros A');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros A');
    })

    this.rubrosService.getSubrubroB().subscribe((resp) => {
      if(resp.status === 202){
        this.subRubrosBList = resp.body;
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros B');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros B');
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
    const rubros = this.filterForm.value;

    this.inPromise = true;
    this.productosService.filter3Pack(rubros).subscribe((resp) => {
      if(resp.ok && resp.status === 201){
        this.setProducts(resp.body.productos);
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Filtrar por Rubros');
      }
      this.inPromise = false;
    },error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Filtrar por Rubros');
      this.inPromise = false;
    });
    
  }

  someAreEmpty(): boolean{
    const values = this.filterForm.value;
    return (values.rubro === '') 
      && (values.subRubroA === '') 
      && (values.subRubroB === '');
  }

  setTotalPages(): void{
    this.productsList.forEach((val,index) => {
      if(index % 8 === 0){
        this.pages++;
      }
    })
  }

  clearFilter(){
    this.filterForm.patchValue({
      rubro: '',
      subRubroA: '',
      subRubroB: '',
    })
  }

  setCurrent({current}){
    console.log(current);
    this.currentPage = Number(current.substr(current.length - 1)) + 1;
  }

}
