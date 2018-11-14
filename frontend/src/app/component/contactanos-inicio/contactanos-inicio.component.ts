import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

@Component({
  selector: 'app-contactanos-inicio',
  templateUrl: './contactanos-inicio.component.html',
  styleUrls: ['./contactanos-inicio.component.css']
})
export class ContactanosInicioComponent implements OnInit {

  configFooter:any = {
    nroContacto:null, mail1: null, mail2:null,
    whatsApp1: null, whatsApp2:null
  }; 

  constructor(private cf_service: ConfgFooterService) { }

  ngOnInit() {
    this.cf_service._getConfigFooter().subscribe(
      (resp:any) => {
        if(resp){
          this.configFooter = resp;              
        }        
      }
    )
  }

}
