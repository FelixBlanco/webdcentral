import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {GaleriaHomeService} from '../../services/galeria-home.service';
import {ProductosService} from '../../services/productos.service';
import {AlertsService} from '../../services/alerts.service'


@Component({
    selector: 'app-galeria-home',
    templateUrl: './galeria-home.component.html',
    styleUrls: ['./galeria-home.component.css']
})
export class GaleriaHomeComponent implements OnInit {


    @ViewChild('image') image: ElementRef;

    new_galeria: any = {
        titulo: null,
        fk_idProducto: null,
        imagen: null
    }

    list_galeria: any;

    list_productos: any;

    constructor(private _galeriaHomeService: GaleriaHomeService,
                private _productosServices: ProductosService,
                private _alertService: AlertsService) {
    }

    ngOnInit() {
        this.getSlideHome();
        this.getListProductos();
    }


    getSlideHome() {
        this._galeriaHomeService._getSlideHome().subscribe(
            (resp: any) => {
                this.list_galeria = resp.producto;
            }
        )
    }

    getListProductos() {
        this._productosServices._getProductos().subscribe(
            (resp: any) => {
                this.list_productos = resp;
            }
        )
    }

    upImg(event) {
        var foto_x: File = event.target.files[0]; // Ubicamos la IMG
        this.new_galeria.imagen = foto_x
    }

    addSlideHome() {
        var galeriaHome: FormData = new FormData(); // Damos Formato
        galeriaHome.append('titulo', this.new_galeria.titulo);
        galeriaHome.append('imagen', this.new_galeria.imagen);
        galeriaHome.append('fk_idProducto', this.new_galeria.fk_idProducto);

        this._galeriaHomeService._addSlideHome(galeriaHome).subscribe(
            (resp: any) => {
                //this._alertService.Success(resp.msj);
                this._alertService.msg("OK", "Éxito", "Se ha guardado el registro");
                this.new_galeria = {titulo: null, fk_idProducto: null, imagen: null}
                this.image.nativeElement.value = '';
                this.getSlideHome();
            },
            error => {
                console.log(error);
                this._alertService.msg("ERR", "Error", `Error: ${error.error}`);

                if (error.error.errors.image[0] != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.image[0]}`);
                }

            }
        )
    }

    deleteSlideHome(id: number) {
        this._galeriaHomeService._deleteSlideHome(id).subscribe(
            resp => {
                this.getSlideHome();
                this._alertService.msg('OK', 'Se elimino correctamente')
                console.log(resp);
            },
            error => {
                this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
            }
        )
    }
}
