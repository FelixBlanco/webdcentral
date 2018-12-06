import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service'
@Component({
  selector: 'app-envios-page',
  templateUrl: './envios-page.component.html',
  styleUrls: ['./envios-page.component.css']
})
export class EnviosPageComponent implements OnInit {

  lista_a:any =[];
  lista_b:any = [];
  lista_c:any = [];
  inPromise:boolean;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.inPromise = true;
    this.deliveryService._getDelivery().subscribe(
      (resp:any) => {  
        this.inPromise = false;
        const nroDivido:any =  parseInt(resp.length) / parseInt('3') // dividimos en las 3 columnas

        // Motamos en cada una de las columnas
        const stop_uno:any  =  nroDivido;
        const stop_dos:any  =  parseInt(nroDivido) * 2;
        const stop_tres:any = parseInt(nroDivido) * 3; 

        for(let i in resp){

          if(i < stop_uno){ 
            this.lista_a.push(resp[i]);
          }

          if(i > stop_uno){ 
            if(i <= stop_dos){ 
              this.lista_b.push(resp[i]);
            }
          }
 
          if(i > stop_dos){ 
            if(i <= stop_tres){
              this.lista_c.push(resp[i]);
            }
          }

        }
      }
    )
    
  }

}
