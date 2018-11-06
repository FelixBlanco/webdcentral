import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  
  alfabeto:string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y'];
  marcasList: any[] = [];
  charSelected: string;
  constructor(private marcaService: MarcasService, private ts : AlertsService) { }

  ngOnInit() {
  }

  find(i: string): void{
    this.charSelected = i;
    this.marcaService.getMarcasBy(i).subscribe(resp=> {
      if(resp.ok && resp.status === 202){
        this.marcasList = resp.body;
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, error => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
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
