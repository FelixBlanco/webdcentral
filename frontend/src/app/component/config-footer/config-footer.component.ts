import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

@Component({
  selector: 'app-config-footer',
  templateUrl: './config-footer.component.html',
  styleUrls: ['./config-footer.component.css']
})
export class ConfigFooterComponent implements OnInit {
  
  data:any = {
      direccion: null, 
      nro_contacto: null, 
      email: null
    };


  constructor(
    private _confgFooterService:ConfgFooterService
  ) { }

  ngOnInit() {
    this.getConfigFooter();
    
  }

  getConfigFooter(){
    this._confgFooterService._getConfigFooter().subscribe(
      resp => { 

        if(resp != null){
          this.data = resp;
        }else{
          this.data = {
            direccion: null, 
            nro_contacto: null, 
            email: null
          };
      
        }
      },
      error => { console.log(error) }
    )
  }

  upgradeCondigFooter(){
    this._confgFooterService._upgradeConfigFooter(this.data).subscribe(
      resp => { },
      error => { }
    );
  }
}
