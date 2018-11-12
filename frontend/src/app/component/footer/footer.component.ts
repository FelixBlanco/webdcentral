import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service'
import { ConfigColorService } from '../../services/config-color.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer_data:any;
  
  colorUno:any; 

  constructor( 
    private _configFooterService:ConfgFooterService,
    private _color: ConfigColorService
  ) { }

  ngOnInit() {
    this.getConfigFooter();

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
        }        
      }
    )

  }

  getConfigFooter(){
    this._configFooterService._getConfigFooter().subscribe(
      resp => {
        if(resp){
          this.footer_data = resp;
        }
      }
    );
  }
}
