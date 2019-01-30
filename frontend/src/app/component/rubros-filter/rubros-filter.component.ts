import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { RubrosService } from 'src/app/services/rubros.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { ConfigColorService } from '../../services/config-color.service';

declare var $: any;

@Component({
  selector: 'app-rubros-filter',
  templateUrl: './rubros-filter.component.html',
  styleUrls: ['./rubros-filter.component.css']
})
export class RubrosFilterComponent implements OnInit {

  filterForm: FormGroup;

  rubrosList: any[] = [];
  subRubrosAList: any[] = [];
  subRubrosBList: any[] = [];

  inPromise: boolean;
  colorTres: any;
  
  constructor(
    private fb: FormBuilder,
    private productsBehavior: ProductsBehaviorService,
    private rubrosService: RubrosService,
    private as: AlertsService,
    private productosService: ProductosService,
    private router: Router,
    private configColor: ConfigColorService,
  ) { }

  ngOnInit() {
    
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorTres = resp.colorClaro
      }
    )  

    this.setRubro();

    this.filterForm = this.fb.group({
      rubro: [''],
      subRubroA: [''],
      subRubroB: [''],
      searchValue: ['', Validators.required]
    });
    

  }
  selectValue(){ 
  this.rubrosService.rubroItem.subscribe(val => {
    if (val) {
       this.rubrosList.map((value,i)=>{
      
         if(value.rubro==val){
           
          this.filterForm.get('rubro').setValue(val); 
          this.onChange(val,'subrubro1');
          this.filterProducts();
        }
       })
       
      
    }
  })
}
  setRubro() {
    this.rubrosService.getRubros().subscribe((resp) => {
      if (resp.status === 202) {
        this.rubrosList = resp.body;
        this.selectValue();
      } else {
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Rubros');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Rubros');
    });
  }

  onChange(filter: string, criteria?: string) {
    
    if (!filter) {
      if (criteria) {
        this.subRubrosAList = [];
      }
      this.subRubrosBList = [];
      return;
    }

    if (filter && criteria) {
      this.filterForm.patchValue({
        subRubroA: '',
        subRubroB: ''
      });
    }


    if (criteria === 'subrubro1') {
      this.rubrosService.getSubrubroA(filter).subscribe((resp) => {
        if (resp.status === 202) {
          this.subRubrosAList = resp.body;
        } else {
          console.error(resp);
          this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros A');
        }
      }, error => {
        console.error(error);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros A');
      });

      this.subRubrosBList = [];
      return;
    }

    this.rubrosService.getSubrubroB(filter).subscribe((resp) => {
      if (resp.status === 202) {
        this.subRubrosBList = resp.body;
      } else {
        console.error(resp);
        this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros B');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Ha ocurrido un error interno => Listar Sub Rubros B');
    })
  }

  filterProducts() {
    const rubros = this.filterForm.value;
    console.log(rubros);
    if (!rubros.rubro && !rubros.subRubroA && !rubros.subRubroB) {
      this.as.msg('INFO', 'Info', 'Debe seleccionar al menos Rubro, Sub Rubro A ó Sub Rubro B');
      return
    }

    this.inPromise = true;
    this.productosService.filter3Pack(rubros).subscribe((resp) => {
      if (resp.ok && resp.status === 201) {
        this.productsBehavior.updateSource(resp.body.productos);
        this.router.navigate(['/productos']);
        setTimeout(() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }), 1000);
        $('#mascotasModal').modal('hide');
        this.setTittleByRubros(rubros);
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

    this.productosService.productosFilterTittleSource.next(tittle);
  }

  someAreEmpty(): boolean {
    const values = this.filterForm.value;
    return (values.rubro === '')
      && (values.subRubroA === '')
      && (values.subRubroB === '');
  }

  search() {

    if (this.filterForm.invalid) {
      return;
    }

    const search = this.filterForm.value.searchValue;
    this.inPromise = true;
    this.productosService.search(search).subscribe(resp => {
      if (resp.ok && resp.status === 200) {
        this.productosService.productosSearchSource.next(resp.body);
        this.productosService.productosFilterTittleSource.next(search);
        $('#mascotasModal').modal('hide');
        $('#busquedaModal').modal('show');


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

  clearFilters() {
    this.filterForm.patchValue({
      rubro: '',
      subRubroA: '',
      subRubroB: '',
      searchValue: ''
    });
    this.someAreEmpty();
  }

}
