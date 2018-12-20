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
  
  // enlaces HREF
  nroTelefono:any='#';
  email1:any='#';
  email2:any='#';
  nroWhatsapp:any='#';
  nroWhatsapp2:any='#';
  urlMaps:any;

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
    this.footerConfigService._getConfigFooter().subscribe( (resp:any) => {
      if(resp){
        this.footerConfig = resp;
        
        // Set
        this.nroTelefono = 'tel:'+resp.nroContacto
        this.email1 = 'mailto:'+resp.mail1
        this.email2 = 'mailto:'+resp.mail2        
        this.nroWhatsapp = 'whatsapp://send/'+resp.whatsApp1;      
        this.nroWhatsapp2 = 'whatsapp://send/'+resp.whatsApp2;
        
        if(!isNaN(this.footerConfig.latitud) && !isNaN(this.footerConfig.longitud)){
          this.lat = Number(this.footerConfig.latitud);
          this.lng = Number(this.footerConfig.longitud);
          this.urlMaps = 'https://maps.google.com/?q='+this.lat+','+this.lng
        }
      }
    })
  }

}
