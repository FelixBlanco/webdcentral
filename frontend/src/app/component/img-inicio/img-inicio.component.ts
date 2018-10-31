import { Component, OnInit } from '@angular/core';

declare var $; 

@Component({
  selector: 'app-img-inicio',
  templateUrl: './img-inicio.component.html',
  styleUrls: ['./img-inicio.component.css']
})
export class ImgInicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
		$("#perdidos").hover(function(){
			$("#perdidos h3").css('display','block');
			$("#perdidos").css('opacity','0.5');
		},function(){
			$("#perdidos").css('opacity','1');
			$("#perdidos h3").css('display','none');
		})

		$("#parejas").hover(function(){
			$("#parejas h3").css('display','block');
			$("#parejas").css('opacity','0.5');
		},function(){
			$("#parejas").css('opacity','1');
			$("#parejas h3").css('display','none');
		})

		$("#adopcion").hover(function(){
			$("#adopcion h3").css('display','block');
			$("#adopcion").css('opacity','0.5');
		},function(){
			$("#adopcion").css('opacity','1');
			$("#adopcion h3").css('display','none');
		})

		$("#blog").hover(function(){
			$("#blog h3").css('display','block');
			$("#blog").css('opacity','0.5');
		},function(){
			$("#blog").css('opacity','1');
			$("#blog h3").css('display','none');
		})
  }

}
