import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service'
import { ConfigColorService } from '../../services/config-color.service';
import { ConfigRedesService } from '../../services/config-redes.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer_data:any;
  
  colorUno:any; 
  
  linksR:any = { facebook:'#', instagram: '#', twitter: '#', whatsapp:'#'};

  constructor( 
    private _configFooterService:ConfgFooterService,
    private _color: ConfigColorService,
    private configRedes: ConfigRedesService
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

    //Links Redes
    this.configRedes._getRed().subscribe(
      (resp:any) => {
        if(!resp){
          this.linksR.facebook  = resp.url_face
          this.linksR.twitter   = resp.url_twit;
          this.linksR.instagram = resp.url_inst;
          this.linksR.whatsapp  = resp.url_what;                  
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
