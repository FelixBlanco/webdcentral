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

  lat: number = 51.678418;
  lng: number = 7.809007;
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
      console.log('Configración de footer:',resp);
      this.footerConfig = resp;
    })
  }
  
}
