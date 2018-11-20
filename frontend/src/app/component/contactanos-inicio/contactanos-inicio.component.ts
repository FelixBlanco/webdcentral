import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

@Component({
  selector: 'app-contactanos-inicio',
  templateUrl: './contactanos-inicio.component.html',
  styleUrls: ['./contactanos-inicio.component.css']
})
export class ContactanosInicioComponent implements OnInit {
  

  section: 'contacts' | 'whereare';
  footerConfig: any;

  lat: number;
  lng: number;
  constructor(private footerConfigService: ConfgFooterService) {
    this.getConfigFooter();
  }

  ngOnInit() {
    this.section = 'contacts';
  }

  routeTo(section : 'contacts' | 'whereare'){
    this.section = section;
  }

  getConfigFooter(){
    this.footerConfigService._getConfigFooter().subscribe( (resp) => {
      if(resp){
        this.footerConfig = resp;
        this.lat = Number(this.footerConfig.latitud);
        this.lng = Number(this.footerConfig.longitud);
      }
    })
  }

}
