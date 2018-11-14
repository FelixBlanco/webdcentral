import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  section: 'home' | 'questions' | 'howto' | 'contact' | 'whereare';
  footerConfig: any;

  lat: number;
  lng: number;
  constructor(private footerConfigService: ConfgFooterService) {
    this.getConfigFooter();
  }

  ngOnInit() {
    this.section = 'home';
  }

  routeTo(section : 'home' | 'questions' | 'howto' | 'contact' | 'whereare'){
    this.section = section;
  }

  getConfigFooter(){
    this.footerConfigService._getConfigFooter().subscribe( (resp) => {
      this.footerConfig = resp;
      this.lat = Number(this.footerConfig.latitud);
      this.lng = Number(this.footerConfig.longitud);
    })
  }
  
}
