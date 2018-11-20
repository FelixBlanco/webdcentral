import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService, SearchBody } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

  searchForm: FormGroup;
  searchList: SearchBody;

  inPromise: boolean;

  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private as: AlertsService,
    private productsBehavior: ProductsBehaviorService,
    private router: Router
  ) { 
    this.searchForm = this.fb.group({
      searchValue: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }


  ngOnInit(){
    this.productService.productosSearchItems.subscribe((val) => {
      this.searchList = val;
    })
  }


  search(){

    if(this.searchForm.invalid){
      return;
    }

    const search = this.searchForm.value.searchValue;
    this.inPromise = true;
    this.productService.search(search).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.productService.productosSearchSource.next(resp.body);
        this.setTittleProductsFilterList(search);
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

  setTittleProductsFilterList(next: string){
    this.productService.productosFilterTittleSource.next(next);
  }
  

  seeMore(what: 'mascotas' | 'productos' | 'marcas'){
    this.productsBehavior.updateSource(
      what === 'mascotas' ? this.searchList.mascotas: what === 'productos' ? this.searchList.nombre: this.searchList.marcas
    );
    $('#busquedaModal').modal('toggle');
    this.router.navigate(['productos']);
  }



}
