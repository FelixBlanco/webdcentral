import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

declare var $; 

@Component({
  selector: 'app-envios-inicio',
  templateUrl: './envios-inicio.component.html',
  styleUrls: ['./envios-inicio.component.css']
})
export class EnviosInicioComponent implements OnInit {

  configData:any = {
    horarios:null, colectivos: null, subtes: null, avenidas: null,
    latitud:null, longitud: null
  };


  lat: number;
  lng: number;

  constructor(private footerConfigService: ConfgFooterService) { }

  ngOnInit() {
    
    this.getData();

    $("#compra").hover(function(){      
      $("#compra img").attr('src',"../assets/como_envio/como_comprar_2.png");
      $("#compra h3").removeClass('hover-normal')
      $("#compra h3").addClass('hover-blue')
    },function(){
      $("#compra img").attr('src',"../assets/como_envio/como_comprar_1.png")
      $("#compra h3").removeClass('hover-blue')
      $("#compra h3").addClass('hover-normal')
    })

    $("#forma_pago").hover(function(){
      $("#forma_pago img").attr('src',"../assets/como_envio/formas_de_pago_2.png")
      $("#forma_pago h3").removeClass('hover-normal')
      $("#forma_pago h3").addClass('hover-blue')
    },function(){
      $("#forma_pago img").attr('src',"../assets/como_envio/formas_de_pago_1.png")
      $("#forma_pago h3").removeClass('hover-blue')
      $("#forma_pago h3").addClass('hover-normal')
    })

    $("#envio").hover(function(){
      $("#envio img").attr('src',"../assets/como_envio/enviar_2.png")
      $("#envio h3").removeClass('hover-normal')
      $("#envio h3").addClass('hover-blue')
    },function(){
      $("#envio img").attr('src',"../assets/como_envio/enviar_1.png")
      $("#envio h3").removeClass('hover-blue')
      $("#envio h3").addClass('hover-normal')
    })

    $("#retiro_tienda").hover(function(){
      $("#retiro_tienda img").attr('src',"../assets/como_envio/retirar_en_tienda_2.png")
      $("#retiro_tienda h3").removeClass('hover-normal')
      $("#retiro_tienda h3").addClass('hover-blue')
    },function(){
      $("#retiro_tienda img").attr('src',"../assets/como_envio/retirar_en_tienda_1.png")
      $("#retiro_tienda h3").removeClass('hover-blue')
      $("#retiro_tienda h3").addClass('hover-normal')
    })

  }

  getData(){
    this.footerConfigService._getConfigFooter().subscribe(
      (resp:any) => {   
        if(resp){
          this.configData = resp;
          this.lat = Number(this.configData.latitud);
          this.lng = Number(this.configData.longitud);
        }     
      }
    )      
  }

}
