import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

@Component({
  selector: 'app-contactanos-inicio',
  templateUrl: './contactanos-inicio.component.html',
  styleUrls: ['./contactanos-inicio.component.css']
})
export class ContactanosInicioComponent implements OnInit {

  configFooter:any; 

  constructor(private cf_service: ConfgFooterService) { }

  ngOnInit() {
    this.cf_service._getConfigFooter().subscribe(
      resp => {
        console.log(resp)
        this.configFooter = resp; 
      }
    )
  }

}
