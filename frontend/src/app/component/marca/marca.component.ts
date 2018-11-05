import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  
  alfabeto:string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y'];
  marcasList: any[] = [];
  charSelected: string;
  constructor(private marcaService: MarcasService) { }

  ngOnInit() {
  }

  find(i: string): void{
    this.charSelected = i;
    this.marcaService.getMarcasBy(i).subscribe(resp=> {
      if(resp.ok && resp.status === 202){
        this.marcasList = resp.body;
      }else{
        //TODO error
      }
    }, error => {
      //TODO error
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

}
