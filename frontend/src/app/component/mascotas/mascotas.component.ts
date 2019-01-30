import { Component, OnInit } from '@angular/core';
import { ConfigColorService } from '../../services/config-color.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {

  colorTres:any;
  
  constructor(
    private configColor: ConfigColorService,
  ) { 
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorTres = resp.colorClaro
      }
    )  
  }

  ngOnInit() {
  }

}
