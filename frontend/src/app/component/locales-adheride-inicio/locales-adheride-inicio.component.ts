import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-locales-adheride-inicio',
  templateUrl: './locales-adheride-inicio.component.html',
  styleUrls: ['./locales-adheride-inicio.component.css']
})
export class LocalesAdherideInicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $("#criaderos").hover(function(){
			$("#criaderos h2").css('display','block');
			$("#criaderos img").css('opacity','0.5');
		},function(){
			$("#criaderos h2").css('display','none');
			$("#criaderos img").css('opacity','1');
		})

		$("#paseadores").hover(function(){
			$("#paseadores h2").css('display','block');
			$("#paseadores img").css('opacity','0.5');
		},function(){
			$("#paseadores h2").css('display','none');
			$("#paseadores img").css('opacity','1');
		})

		$("#bano_p").hover(function(){
			$("#bano_p h2").css('display','block');
			$("#bano_p img").css('opacity','0.5');
		},function(){
			$("#bano_p h2").css('display','none');
			$("#bano_p img").css('opacity','1');
		})

		$("#veterinario").hover(function(){
			$("#veterinario h2").css('display','block');
			$("#veterinario img").css('opacity','0.5');
		},function(){
			$("#veterinario h2").css('display','none');
			$("#veterinario img").css('opacity','1');
		})

  }

}
