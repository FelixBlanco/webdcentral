import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  
  letters:string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y'];
  marcasList: any[] = [];
  charSelected: string;
  inPromise: boolean;
  inFetch: boolean;

  productsList: Producto[] = [];

  marcaSelected: string = "";

  constructor(
    private marcaService: MarcasService, 
    private ts : AlertsService,
    private productsBehavior: ProductsBehaviorService,
    private productsService: ProductosService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  select(marca: string){
    this.marcaSelected = marca;
  }

  find(i: string): void{
    this.inPromise = true;
    this.charSelected = i;
    this.marcasList = [];
    this.marcaService.getMarcasBy(i).subscribe(resp=> {
      if(resp.ok && resp.status === 202){
        this.marcasList = resp.body;
        this.inPromise = false;
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
        this.inPromise = false;
      }
    }, error => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      this.inPromise = false;
    })
  }

  isARow($index: number): boolean{
    if($index % 4){
      return false;
    }
    return true;
  }

  getPartialItems(from, to): any[]{
    let partialItems: any[] = [];

    this.marcasList.forEach((val,i) => {
      if(i>= from && i <= to){
        partialItems.push(val);
      }
    })

    return partialItems;
  }

  filter(){
    const marca = this.marcaSelected;

    if(!marca){
      return;
    }

    this.inFetch = true;
    this.productsService.getByMarca(marca).subscribe((resp) => {
      if(resp.ok && resp.status === 202){
        $('#marcaModal').modal('toggle');
        this.productsBehavior.updateSource(resp.body);
        this.productsService.productosFilterTittleSource.next(marca);
        this.inFetch = false;
        this.router.navigate(['/productos'],{queryParams: {scroll: true}});
        this.marcaSelected = '';
        this.charSelected = '';
      }else{
        console.error(resp);
        this.ts.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
    }, error => {
      console.error(error);
      this.ts.msg('ERR', 'Error', 'Ha ocurrido un error interno');
    })
  }

}
