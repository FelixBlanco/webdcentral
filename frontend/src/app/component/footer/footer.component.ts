import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service'
import { ConfigColorService } from '../../services/config-color.service';
import { ConfigRedesService } from '../../services/config-redes.service'
import { ClasificadosService } from '../../services/clasificados.service'
import { LocalesAdheridosService } from '../../services/locales-adheridos.service'
import { HorarioAtencionServiceService } from '../../services/horario-atencion-service.service'
import { Router } from '@angular/router';
import { UserTokenService } from 'src/app/services/user-token.service'
//import { LocalesAdheridosService } from 'src/app/services/locales-adheridos.service';
declare var $;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer_data:any;
  
  colorUno:any; 
  
  linksR:any = { facebook:'#', instagram: '#', twitter: '#', whatsapp:'#'};
  lista_clasificados:any;
  lista_locales:any;
  listaHorarios:any;
  listaSecciones : any[]=['ofertas','destacados','productos','mascotas','marcas']

  constructor( 
    private _configFooterService:ConfgFooterService,
    private _color: ConfigColorService,
    private configRedes: ConfigRedesService,
    private clasificadoService:ClasificadosService,
    private localesAdheridosService:LocalesAdheridosService,
    private _HorarioAtencionServiceService:HorarioAtencionServiceService,
    private ruta : Router,
    private userTokenService: UserTokenService,
  ) { 
    this._HorarioAtencionServiceService._getHorarios(null).subscribe(
      (resp: any) => {
        this.listaHorarios = resp;
        console.log(this.listaHorarios);
      });
  }

  ngOnInit() {
    
    this.getConfigFooter();
    this.getListaClasificados();
    this.getLocalesAdheridosPorNro();

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
        if(resp){
          this.linksR.facebook  = resp.url_face
          this.linksR.twitter   = resp.url_twit;
          this.linksR.instagram = resp.url_inst;
          this.linksR.whatsapp  = resp.url_what+'&text='+resp.msj_what;
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

  getListaClasificados(){
    this.clasificadoService.listaPorNumero(5).subscribe(
      (resp:any) => {
        if(resp.Clasificado != null){
          this.lista_clasificados = resp.Clasificado
        }        
      }
    )
  }

  getLocalesAdheridosPorNro(){
    this.localesAdheridosService.getListaPorNro(5).subscribe(
      (resp:any) => {
        if(resp.locales_adheridos != null){
          this.lista_locales = resp.locales_adheridos;
        }        
      }
    )
  }
  navegarTo(section:any){
    if(section == 'ofertas'|| section =='productos'){
      this.ruta.navigate([`/${section}`]);
    }else if(section=="marcas"){
      $('#marcaModal').modal('show');
    }  else if(section=="mascotas"){
      $('#mascotasModal ').modal('show');
    }else if(section=="destacados"){
      this.ruta.navigate([`/`]);
      setTimeout(()=> document.getElementById('destacadoSection').scrollIntoView({behavior: 'smooth'}),1000);

    }
  }
  goToClasificado(item:any){
    console.log(item.idClasificado);
   
      console.log(this.userTokenService.isNotLogged());
      if (!this.userTokenService.isNotLogged()) {
       // this.inBatch = clasificadoId;
        this.localesAdheridosService.updateSource(item.idClasificado);
        this.ruta.navigate(['/servicios']);
      } else {
        $('#loginModal').modal('show');
        //this.as.msg('ERR', 'Error', 'Debe logearse para solicitar turnos' );
      
    }
  }
}
