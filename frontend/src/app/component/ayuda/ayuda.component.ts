import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';
import { VideosService } from '../../services/videos.service'
import { DomSanitizer } from '@angular/platform-browser'
import { ConfigColorService } from '../../services/config-color.service';

declare var $:any;

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  section: 'home' | 'questions' | 'howto' | 'contact' | 'whereare' | 'video';
  footerConfig: any;
  videos: any;
  lat: number;
  lng: number;
  urlVideo : any;
  titulo_video: any;
  colorUno:any;
  colorDos:any;

  constructor(
    private footerConfigService: ConfgFooterService,
    private videoService : VideosService,
    private sanitizer: DomSanitizer,
    private _color: ConfigColorService,
  ) {
    this.getConfigFooter();
    this.getVideos();
  }

  ngOnInit() {
    

  this._color._paletaColor().subscribe(
    (resp:any) => {      
      this.colorUno = resp.colorOscuro;
      this.colorDos = resp.colorMedio;
    }
  )

   this.footerConfigService.ayudaS.subscribe(val=>{
  
     this.section=val;
   });
   this.section = 'home';
  }

  routeTo(section : 'home' | 'questions' | 'howto' | 'contact' | 'whereare' | 'video'){
    this.section = section;
  }

  routeToVideo(section : 'home' | 'questions' | 'howto' | 'contact' | 'whereare' | 'video',itemVideo:any){
    this.titulo_video = itemVideo.titulo;
    this.urlVideo     = itemVideo.url;
    this.section      = section;
  }

  getConfigFooter(){
    this.footerConfigService._getConfigFooter().subscribe( (resp) => {
      if(resp){
        this.footerConfig = resp;
        if(!isNaN(this.footerConfig.latitud) && !isNaN(this.footerConfig.longitud)){
          this.lat = Number(this.footerConfig.latitud);
          this.lng = Number(this.footerConfig.longitud);
        }
      }
    })
  }
  
  getVideos(){
    this.videoService._getListaVideos().subscribe(
      (resp:any) => {
        this.videos = resp.PFrec;
      }
    )
  }

  setUrl(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
