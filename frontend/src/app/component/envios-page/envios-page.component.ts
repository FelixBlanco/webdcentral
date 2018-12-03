import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service'
@Component({
  selector: 'app-envios-page',
  templateUrl: './envios-page.component.html',
  styleUrls: ['./envios-page.component.css']
})
export class EnviosPageComponent implements OnInit {

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {

    this.deliveryService._getDelivery().subscribe(
      (resp:any) => {
        if(resp){
          console.log(resp)
        }        
      },
      error => {
        console.log(error)
      }
    )

  }

}
