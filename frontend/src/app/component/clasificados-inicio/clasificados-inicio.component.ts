import { Component, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/services/productos.service';
import { LocalesAdheridosService } from 'src/app/services/locales-adheridos.service';
import { Router } from '@angular/router'; 
import { AlertsService } from 'src/app/services/alerts.service';
import { UserTokenService } from 'src/app/services/user-token.service'
import { ConfigColorService } from '../../services/config-color.service';

declare var $;
@Component({
  selector: 'app-clasificados-inicio',
  templateUrl: './clasificados-inicio.component.html',
  styleUrls: ['./clasificados-inicio.component.css']
})
export class ClasificadosInicioComponent implements OnInit {

  inPromise: boolean;
  inBatch: number;
  isLoged: boolean;
  colorUno: any;
  clasificadosList: any[] = [];
  carouselItems: CarouselItem[];
  aTimeOutFix: boolean = false;
  constructor(
    private localesService: LocalesAdheridosService,
    private as: AlertsService,
    private router: Router,
    private userTokenService: UserTokenService,
    private configColores : ConfigColorService
  ) { }

  ngOnInit() {
    this.getAll();

    this.configColores._paletaColor().subscribe(
      (resp:any) => {
        this.colorUno = resp.colorOscuro
      }
    )   
  }

  getAll() {
    this.inPromise = true;
    this.localesService.getAllClasificadosSinAuth().subscribe(
      (resp) => {
        if (resp.ok && resp.status === 201) {
          this.clasificadosList = resp.body.Clasificado;
          this.generateCarousel();
        } else {
          this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');

        }
        this.inPromise = false;
      }, (error) => {

        this.inPromise = false;
        this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');
      }
    )
  }

  getAllLocalesBy(clasificadoId) {
    if (this.inBatch) {
      return;
    }
    console.log(this.userTokenService.isNotLogged());
    if (!this.userTokenService.isNotLogged()) {
      this.inBatch = clasificadoId;
      this.localesService.updateSource(clasificadoId);
      this.router.navigate(['/servicios']);
    } else {
      $('#loginModal').modal('show');
      //this.as.msg('ERR', 'Error', 'Debe logearse para solicitar turnos' );
    }
  }

  generateCarousel() {
    if (!this.clasificadosList.length) {
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.clasificadosList.forEach((val, i) => {
      if (this.isACarruselItem(i)) {
        this.carouselItems.push({ id: index++, items: this.getPartialItems(i, i + 7) });
      }
    });

    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.aTimeOutFix = true, 1000); // :(
  }

  isACarruselItem($index): boolean {
    if ($index % 8) {
      return false;
    }
    return true;
  }


  getPartialItems(from, to): any[] {
    let items: any[] = [];

    this.clasificadosList.forEach((item, i) => {
      if (i >= from && i <= to) {
        items.push(item);
      }
    });

    return items;
  }

}
