import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';
import { VideosService } from '../../services/videos.service'
import { DomSanitizer } from '@angular/platform-browser'

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

  constructor(
    private footerConfigService: ConfgFooterService,
    private videoService : VideosService,
    private sanitizer: DomSanitizer
  ) {
    this.getConfigFooter();
    this.getVideos();
  }

  ngOnInit() {
    
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
