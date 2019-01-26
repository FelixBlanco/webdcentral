import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';
import { ConfigColorService } from '../../services/config-color.service';

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
  
  inPromise:Boolean=false;
  lat: number;
  lng: number;
  link_mercadopago:string;
  colorUno:any;

  constructor(private footerConfigService: ConfgFooterService, private configColorService: ConfigColorService) { 

    $("#forma_pago").hover(function(){
      $("#forma_pago img").attr('src',"../assets/como_envio/formas_de_pago_2.png")
      $("#forma_pago h3").removeClass('hover-normal')
      $("#forma_pago h3").addClass('hover-blue')
      $("#forma_pago h3").css('background-color',this.colorUno);
    },function(){
      $("#forma_pago img").attr('src',"../assets/como_envio/formas_de_pago_1.png")
      $("#forma_pago h3").removeClass('hover-blue')
      $("#forma_pago h3").addClass('hover-normal')
      $("#forma_pago h3").css('background-color','none')
    })

    $("#envio").hover(function(){
      $("#envio img").attr('src',"../assets/como_envio/enviar_2.png")
      $("#envio h3").removeClass('hover-normal')
      $("#envio h3").addClass('hover-blue')
      $("#envio h3").css('background-color',this.colorUno);
    },function(){
      $("#envio img").attr('src',"../assets/como_envio/enviar_1.png")
      $("#envio h3").removeClass('hover-blue')
      $("#envio h3").addClass('hover-normal')
      $("#envio h3").css('background-color','none')
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

  ngOnInit() {
    
    this.getData();

    this.configColorService._paletaColor().subscribe(
      (resp:any) => {
        this.colorUno = resp.colorOscuro
      }      
    )
    

    
  }

  hoverShow(idIMG:any){
    $(idIMG +" h3").css('background-color',this.colorUno);
    $(idIMG +" img").attr('src',"../assets/como_envio/como_comprar_2.png");
    $(idIMG +" h3").removeClass('hover-normal')
    $(idIMG +" h3").addClass('hover-blue') 
  }

  hoverHide(idIMG:any){
    $(idIMG +" h3").css('background-color','#ffffff')
    $(idIMG +" img").attr('src',"../assets/como_envio/como_comprar_1.png")
    $(idIMG +" h3").removeClass('hover-blue')
    $(idIMG +" h3").addClass('hover-normal')      
  }

  getData(){
    this.inPromise= true;  
    this.footerConfigService._getConfigFooter().subscribe(
      (resp:any) => {  
        this.inPromise=false; 
        if(resp){
          this.configData = resp;
         
          this.link_mercadopago = resp.url_mercadopago;
          this.lat = Number(this.configData.latitud);
          this.lng = Number(this.configData.longitud);
        }     
      }
    )      
  }
  route_Mpago(){
    /* window.location.href=this.link_mercadopago; */ // abre el link en la pestaña actual
    window.open(this.link_mercadopago,'_blank');  // abre el link en una nueva pestaña
  }

  dondeEstamosModal(){ // muestre el donde estamos de una vez de contactanos
    $('#contactanosModal').modal('show');
    document.getElementById("btn_contactanos").click();  
  }

}
