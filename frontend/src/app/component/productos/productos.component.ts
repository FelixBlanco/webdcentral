import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto, ProductosService } from 'src/app/services/productos.service';
import { RubrosService } from 'src/app/services/rubros.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $:any;
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

  tittleList: string;

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
      searchValue: ['', Validators.required]
    });

    this.pages = 0;
    
  }

  ngOnInit() {
    this.iniBehavior();
    this.setRubros();
    this.iniTittleBehavior();
  }

  iniTittleBehavior(){
    this.productosService.productosFilterTittle.subscribe(val => this.tittleList = val);
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
        this.setTittleByRubros(rubros);
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

  setTittleByRubros(rubros){
    const keys: string[] = Object.keys(rubros);
    let tittle: string = '';

    keys.forEach((val,indx) => {
      tittle = tittle.concat(indx === 0 ? rubros[val] : rubros[val] ? ` / ${rubros[val]}`: '');
    })

    this.productosService.productosFilterTittleSource.next(tittle);
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
    this.currentPage = Number(current.substr(current.length - 1)) + 1;
  }

  search(){

    if(this.filterForm.invalid){
      return;
    }

    const search = this.filterForm.value.searchValue;
    this.inPromise = true;
    this.productosService.search(search).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.productosService.productosSearchSource.next(resp.body);
        this.productosService.productosFilterTittleSource.next(search);

        $('#busquedaModal').modal('toggle');
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error al buscar');
      }
      this.inPromise = false;
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error al buscar');
      this.inPromise = false;
    });
  }

}
