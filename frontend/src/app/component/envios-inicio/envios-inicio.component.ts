import { Component, OnInit } from '@angular/core';

declare var $; 

@Component({
  selector: 'app-envios-inicio',
  templateUrl: './envios-inicio.component.html',
  styleUrls: ['./envios-inicio.component.css']
})
export class EnviosInicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $("#como_comprar").hover(function(){
      $("#como_comprar").attr('src',"../assets/envios-inicio/como_comprar_2.png")
    },function(){
      $("#como_comprar").attr('src',"../assets/envios-inicio/como_comprar_1.png")
    })

    $("#formas_de_pago").hover(function(){
      $("#formas_de_pago").attr('src',"../assets/envios-inicio/formas_de_pago_2.png")
    },function(){
      $("#formas_de_pago").attr('src',"../assets/envios-inicio/como_comprar_1.png")
    })

    $("#enviar").hover(function(){
      $("#enviar").attr('src',"../assets/envios-inicio/enviar_2.png")
    },function(){
      $("#enviar").attr('src',"../assets/envios-inicio/enviar_1.png")
    })

    $("#retirar_en_tienda").hover(function(){
      $("#retirar_en_tienda").attr('src',"../assets/envios-inicio/retirar_en_tienda_2.png")
    },function(){
      $("#retirar_en_tienda").attr('src',"../assets/envios-inicio/retirar_en_tienda_1.png")
    })

  }


}
