import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/services/productos.service';
import { LocalesAdheridosService } from 'src/app/services/locales-adheridos.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-clasificados-inicio',
  templateUrl: './clasificados-inicio.component.html',
  styleUrls: ['./clasificados-inicio.component.css']
})
export class ClasificadosInicioComponent implements OnInit {

  inPromise: boolean;
  inBatch: number;

  clasificadosList: any[] = [];
  carouselItems: CarouselItem[];

  aTimeOutFix: boolean = false;
  constructor(
    private localesService: LocalesAdheridosService,
    private as: AlertsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.inPromise = true;
    this.localesService.getAllClasificados().subscribe(
      (resp) =>{
        if(resp.ok && resp.status === 201){
          this.clasificadosList = resp.body.Clasificado;
          this.generateCarousel();
        }else{
          this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');
          console.error(resp);
        }
        this.inPromise = false;
      },(error) => {
        console.error(error);
        this.inPromise = false;
        this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');
      }
    )
  }

  getAllLocalesBy(clasificadoId){
    if(this.inBatch){
      return;
    }

    this.inBatch = clasificadoId;

    this.localesService.getAll().subscribe(
      (resp) => {
        if(resp.ok && resp.status === 201){
          this.localesService.updateSource(resp.body.LocalAdh);
          this.router.navigate(['/servicios']);
          //TODO scroll
        }else{
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error al obtener los locales');
        }
        this.inBatch = null;
      },(error) => {
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error al obtener los locales');
        console.error(error);
        this.inBatch = null;
      }
    )
  }

  generateCarousel(){
    if(!this.clasificadosList.length){
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.clasificadosList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, items: this.getPartialItems(i,i+7)});
      }
    });
    
    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=> this.aTimeOutFix = true,1000); // :(
  }

  isACarruselItem($index): boolean {
    if($index % 8){
      return false;
    }
    return true;
  }


  getPartialItems(from, to): any[]{
    let items: any[] = [];

    this.clasificadosList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

}
