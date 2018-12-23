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
        var precio:any;

        for(let i in resp){
          
          if(i < stop_uno){ 
            // this.lista_a.push(resp[i]);
            if(!resp[i].Expr1){
              precio = 0
            }else{
              precio = resp[i].Expr1;
            }

            this.lista_a.push({
              localidad: resp[i].Descripcion_Localidad,
              precio : '$ '+precio,
              zona : resp[i].Descripcion_Zona
            });
          }

          // segunda lista

          if(i > stop_uno){ 
            if(i < stop_dos){ 
              if(!resp[i].Expr1){
                precio = 0
              }else{
                precio = resp[i].Expr1;
              }
  
              this.lista_b.push({
                localidad: resp[i].Descripcion_Localidad,
                precio : '$ '+precio,
                zona : resp[i].Descripcion_Zona
              });
            }
          }


        }        
      }
    )
  }

}
