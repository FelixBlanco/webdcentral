import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/services/productos.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { ConfigColorService } from '../../services/config-color.service';
import { GaleryProductService, GaleryProduct } from '../../services/galery-product.service';

import {MarcaComponent} from '../marca/marca.component'
declare var $;
@Component({
  selector: 'app-marcas-inicio',
  templateUrl: './marcas-inicio.component.html',
  styleUrls: ['./marcas-inicio.component.css']
})
export class MarcasInicioComponent implements OnInit {

  galeryList: any[]=[] ;
  colorTres:any;

  carouselItems: CarouselItem[] = [];

  aTimeOutFix: boolean = false;
  aTimeOutFix2: boolean = false;
  inPromise: boolean;
  marcasList:GaleryProduct[]=[]
  constructor(
    private configColor: ConfigColorService,
    private carouselConfig: NgbCarouselConfig, 
    private ts: AlertsService,
    private productsBehavior: ProductsBehaviorService,
    private marcaService: MarcasService,
    private productosService: ProductosService,
    private router : Router,
    private galeryMarcasServices: GaleryProductService
  ) { 
    this.carouselConfig.interval = 5000;
    this.carouselConfig.showNavigationArrows = true;
    
  }

  ngOnInit() {
    this.inPromise=true;
    this.galeryMarcasServices.getAll().subscribe(val=>{
      if(val){
       
       this.galeryList= val.body.galeria;
        this.kickStatusInactive();
     
   
      }
      this.inPromise= false;
      this.generateCarousel();
    })

    this.configColor._paletaColor().subscribe(
      (resp:any) => {
        this.colorTres = resp.colorClaro
      }
    )   

  }

  kickStatusInactive(){
    this.galeryList.map((val, i) =>{
      if(val.fk_idStatusSistema == 0){
       // console.log(val.);
       this.galeryList.splice(i,1);
      }
    })
  }
  setMarcasList(marca:string,i:number){
    //this.inPromise = true;
    
    this.marcaService.getMarcasBy(marca).subscribe(resp => {
      if(resp.ok && resp.status === 202){
        this.galeryList.push(resp.body[0]);
 

      }else{
       // this.inPromise = false;
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    //  console.log(i+" position");
      if(i>=this.marcasList.length-1){ // si ya termino de cargar el galeryList
        this.inPromise=false;
     //   console.log("generando carousel marcas")
        this.generateCarousel();

      
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



    this.carouselItems = [];
    let index: number = 1;
    this.galeryList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, items: this.getPartialItems(i,i+4)});
      }
    });
    this.inPromise = false;
    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=> {this.aTimeOutFix = true; this.aTimeOutFix2=true;},1000); // :(
     console.log(this.carouselItems);
     
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


  filter(marca:string){
    

    if(!marca){
      return;
    }

    this.inPromise = true;
    this.productosService.getByMarca(marca).subscribe((resp) => {
      if(resp.ok && resp.status === 202){
       // $('#marcaModal').modal('toggle');
        this.productsBehavior.updateSource(resp.body);
        this.productosService.productosFilterTittleSource.next(marca);
        this.inPromise = false;
        this.router.navigate(['/productos']);
        setTimeout(()=> document.getElementById('productos').scrollIntoView({behavior: 'smooth'}),1000);
      //  this.marcaSelected = '';
      //  this.charSelected = '';
      }else{
        console.error(resp);
        this.ts.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
    }, error => {
      console.error(error);
      this.ts.msg('ERR', 'Error', 'Ha ocurrido un error interno');
    })
  }
  toMarca(){
    $('#marcaModal').modal('toggle');
    this.marcaService.updateFromMarcaInicio(true);
  
  }
  fixedSelectidSlider(){
    this.aTimeOutFix2=false;
    console.log("fixed");
  }
  

}
