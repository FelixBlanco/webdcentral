import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService, SearchBody, Producto } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { RubrosService } from 'src/app/services/rubros.service';

import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Router } from '@angular/router';
import { parse } from 'url';
declare var $: any;
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  searchForm: FormGroup;
  searchList: SearchBody;
  searchListMarcas: Array<any>;
  filterFormRubros: FormGroup;
  searchListRubros:Array<any>;

  inPromise: boolean;

  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private as: AlertsService,
    private productsBehavior: ProductsBehaviorService,
    private router: Router,
    private marcasServices: MarcasService,
    private rubroService:RubrosService
  ) {
    this.searchForm = this.fb.group({
      searchValue: ['', [Validators.required, Validators.maxLength(50)]]
    })
      this.filterFormRubros = this.fb.group({
      rubro: [''],
      subRubroA: [''],
      subRubroB: [''],
      searchValue: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.productService.productosSearchItems.subscribe((val) => {
    
      this.searchList = val;
      this.deleteRepeatRubros();
    })
  }


  search() {

    if (this.searchForm.invalid) {
      return;
    }
    //busquedas de marcas
    const search = this.searchForm.value.searchValue;
    let behaviorPromises: Promise<Producto[]>[] = [];
    this.inPromise = true;
    this.marcasServices.getMarcasBy(search).subscribe(resp => {
      if (resp.ok && resp.status === 202) {
        this.searchListMarcas = resp.body;
        console.log(resp.body);

      } else {
        this.as.msg("ERR", "Error", "Ha ocurrido un error interno");

      }
    }, error => {
      this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);

    })

   //busqueda productos y mascotas
    this.productService.search(search).subscribe(resp => {
      if (resp.ok && resp.status === 200) {
        console.log(resp.body.mascotas);
        behaviorPromises.push(
          this.productsBehavior.parseDefaultPrice(resp.body.marcas),
          this.productsBehavior.parseDefaultPrice(resp.body.nombre),
          this.productsBehavior.parseDefaultPrice(resp.body.mascotas)
        );

        Promise.all(behaviorPromises).then(values => {
          let parsed: any = {};

          parsed.marcas = values[0];
          parsed.nombre = values[1];
          parsed.mascotas = values[2];

          this.productService.productosSearchSource.next(parsed);
          this.setTittleProductsFilterList(search);
          $('#busquedaModal').modal('toggle');
          this.searchForm.reset();
          Object.keys(this.searchForm.controls).forEach(key => {
            this.searchForm.controls[key].setErrors(null);
          });
        });
      } else { 
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

  setTittleProductsFilterList(next: string) {
    this.productService.productosFilterTittleSource.next(next);
  }


  seeMore(what: 'mascotas' | 'productos' | 'marcas',index_:number) {
    
    const prod:any[]= what === 'mascotas' ? this.searchList.mascotas : what === 'productos' ? this.searchList.nombre : this.searchList.marcas
    this.productsBehavior.updateSource(prod,index_);
    $('#busquedaModal').modal('toggle');
    this.router.navigate(['/productos']);
    setTimeout(() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }), 1000);
  }
  seeMarcas(marca:string){
    this.productService.getByMarca(marca).subscribe((resp) => {
      if(resp.ok && resp.status === 202){
       
        this.productsBehavior.updateSource(resp.body,null);
        this.productService.productosFilterTittleSource.next(marca);
        $('#busquedaModal').modal('toggle');
        this.router.navigate(['/productos']);
        setTimeout(()=> document.getElementById('productos').scrollIntoView({behavior: 'smooth'}),1000);
    
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
    })
  }
  seeRubro(rubro:string,subRubro1:string,subRubro2:string) {
    
    if (!rubro && !subRubro1 && !subRubro2) {
      return;
    }
     $('#busquedaModal').modal('toggle');
        this.router.navigate(['/productos']);

  
    this.filterFormRubros.get('rubro').setValue(rubro);
    this.filterFormRubros.get('subRubroA').setValue(subRubro1);
    this.filterFormRubros.get('subRubroB').setValue(subRubro2);
    this.filterFormRubros.updateValueAndValidity();
    const rub = this.filterFormRubros.value;

    this.inPromise = true;
    this.productService.filter3Pack(rub).subscribe((resp) => {
      if (resp.ok && resp.status === 201) {
        this.productsBehavior.updateSource(resp.body.productos);
       
        setTimeout(() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }), 1000);
        
        this.setTittleByRubros(rub);
      } else {
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Filtrar por Rubros');
      }
      this.inPromise = false;
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Filtrar por Rubros');
      this.inPromise = false;
    });
  }
  setTittleByRubros({ rubro, subRubroA, subRubroB }) {
    const rubros = { rubro, subRubroA, subRubroB };
    const keys: string[] = Object.keys(rubros);
    let tittle: string = '';


    keys.forEach((val, indx) => {
      tittle = tittle.concat(indx === 0 ? rubros[val] : rubros[val] ? ` / ${rubros[val]}` : '');
    })

    this.productService.productosFilterTittleSource.next(tittle);
  }
  deleteRepeatRubros(){
    if(this.searchList && this.searchList.mascotas && this.searchList.mascotas.length){
      this.searchListRubros=[];
      this.searchListRubros.push(this.searchList.mascotas[0]);
      
      this.searchList.mascotas.map((val,i)=>{
        let aux:boolean=true;
        this.searchListRubros.map(val2=>{
          if(aux && val.SubRubro1==val2.SubRubro1){
             if(val.SubRubro2==val2.SubRubro2){
              aux=false;
             }
             
          }
        })
        if(aux){
          this.searchListRubros.push(val);
        }

      
    })
    
    }
    console.log(this.searchListRubros)
   
  }

}
