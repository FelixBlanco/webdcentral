import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  data:any = { 
    img_envio_1: null, 
    img_envio_2: null, 
    img_envio_3: null, 
    
  };

  constructor(
    private _confgFooterService:ConfgFooterService,
  ) { }

  ngOnInit() { 
    this.serviceCall();
  }

  serviceCall() {
    this._confgFooterService._getConfigFooter().subscribe(
      (resp: any) => {
        if (resp) {
          this.data.img_envio_1 = resp.img_envio_1;
          this.data.img_envio_2 = resp.img_envio_2;
          this.data.img_envio_3 = resp.img_envio_3;
          console.log(this.data);
        }
      }
    ) 
  }

}
