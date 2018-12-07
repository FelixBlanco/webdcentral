import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalesAdheridosService } from 'src/app/services/locales-adheridos.service';
import { Subscription } from 'rxjs';
import { CarouselItem } from 'src/app/services/productos.service';

@Component({
  selector: 'app-servicios-inicio',
  templateUrl: './servicios-inicio.component.html',
  styleUrls: ['./servicios-inicio.component.css']
})
export class ServiciosInicioComponent implements OnInit, OnDestroy {

  inPromise: boolean
  localesBehaviorSuscription: Subscription;

  carouselItems: CarouselItem[] = [];
  localesList: any[];

  aTimeOutFix: boolean = false;
  constructor(
    private localesService: LocalesAdheridosService
  ) { }

  ngOnInit() {
    this.initializeBehavior();
  }

  initializeBehavior(){
    this.localesBehaviorSuscription = this.localesService.localesItems.subscribe((val) => {
      this.localesList = val;
      this.generateCarousel();
      console.log(val);
    });
  }

  generateCarousel(){
    if(!this.localesList.length){
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.localesList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, items: this.getPartialItems(i,i+4)});
      }
    });
    
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

    this.localesList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

  ngOnDestroy(){
    this.localesBehaviorSuscription.unsubscribe();
  }

}
