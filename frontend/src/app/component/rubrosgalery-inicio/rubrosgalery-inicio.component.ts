import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/services/productos.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';
import { RubrosService } from 'src/app/services/rubros.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { ConfigColorService } from '../../services/config-color.service';

@Component({
  selector: 'app-rubrosgalery-inicio',
  templateUrl: './rubrosgalery-inicio.component.html',
  styleUrls: ['./rubrosgalery-inicio.component.css']
})
export class RubrosgaleryInicioComponent implements OnInit {

  galeryList: any[] ;
  colorTres:any;

  carouselItems: CarouselItem[] = [];

  aTimeOutFix: boolean = false;
  
  inPromise: boolean;

  constructor(
    private configColor: ConfigColorService,
    private carouselConfig: NgbCarouselConfig, 
    private ts: AlertsService,
    private productsBehavior: ProductsBehaviorService,
    private rubrosService: RubrosService,
    private productosService: ProductosService,
    private router : Router
  ) { 
    this.carouselConfig.interval = 5000;
    this.carouselConfig.showNavigationArrows = true;
  }

  ngOnInit() {
    this.setRubrosList();
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorTres = resp.colorClaro
      }
    )
  }

  setRubrosList(){
    this.inPromise = true;
    
    this.rubrosService.getRubros().subscribe(resp => {
      if(resp.ok && resp.status === 202){
        this.galeryList = resp.body;
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
    console.log(this.galeryList.length);
    if(!this.galeryList.length){
      this.inPromise = false;
      return;
    }


    /*  let aux: any[] = [];
e31209333aca1a9385d3c44112f74c15d929550b

    //Para tener solo los items que poseen imagenes
    this.galeryList.forEach(val => {
      if(val.WebLink_Rubro){
        aux.push(val);
      }
    });


    this.galeryList =  [...aux];  */


    this.carouselItems = [];
    let index: number = 1;
    this.galeryList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, items: this.getPartialItems(i,i+4)});
      }
    });
    this.inPromise = false;
    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=> this.aTimeOutFix = true,1000); // :(
  }

  isACarruselItem($index): boolean {
    if($index % 5){
      return false;
    }
    return true;
  }


  getPartialItems(from, to): any[]{
    let items: any[] = [];

    this.galeryList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

  filterProducts(rubro:string){
    this.rubrosService.updateSource(rubro);
    this.router.navigate(['/productos']);
    /* this.inPromise=true;
    console.log(rubro);
    this.rubrosService.updateSource(rubro);
    const rubros = {rubro: rubro, subRubroA: "", subRubroB: "", searchValue: ""} ;
   
    if(!rubros.rubro && !rubros.subRubroA && !rubros.subRubroB){
      return
    }

    this.inPromise = true;
    this.productosService.filter3Pack(rubros).subscribe((resp) => {
      if(resp.ok && resp.status === 201){
        this.productsBehavior.updateSource(resp.body.productos);
        this.router.navigate(['/productos']);
        setTimeout(()=> document.getElementById('productos').scrollIntoView({behavior: 'smooth'}),1000);    
        this.setTittleByRubros(rubros);
      }else{
        console.error(resp);
        this.ts.msg('ERR', 'Ha ocurrido un error interno => Filtrar por Rubros');
      }
      this.inPromise = false;
    },error => {
      console.error(error);
      this.ts.msg('ERR', 'Ha ocurrido un error interno => Filtrar por Rubros');
      this.inPromise = false;
    }); */
    
  }
  setTittleByRubros({rubro,subRubroA, subRubroB}){
    const rubros = {rubro,subRubroA, subRubroB};
    const keys: string[] = Object.keys(rubros);
    let tittle: string = '';


    keys.forEach((val,indx) => {
      tittle = tittle.concat(indx === 0 ? rubros[val] : rubros[val] ? ` / ${rubros[val]}`: '');
    })

    this.productosService.productosFilterTittleSource.next(tittle);
  }

}
