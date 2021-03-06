import {Component, OnInit, ViewChild} from "@angular/core";
import {OfertasService} from "../../services/ofertas.service";
import {AlertsService} from "../../services/alerts.service";
import {ProductosService} from "../../services/productos.service";

declare var $;

@Component({
    selector: 'app-ofertas',
    templateUrl: './ofertas.component.html',
    styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

    @ViewChild('table') table;

    listOfertas: any;
    lista_productos:any;
    form_ofertas: any = {idOferta: "", titulo: "", tiempoExpi: "", imagen: "", status: true,idProducto:null,base_cond:null}

    edit_form_ofertas: any = {idOferta: "", titulo: "", tiempoExpi: "", imagen: "", status: true,idProducto:null,base_cond:null}
    inPromise: boolean;
    
    columns = [
        { prop: 'titulo' },
        { prop: 'set_imagen' },
        { prop: 'tiempoExpi' },  
        { prop: 'base_cond' },  
        { prop: 'nombreProducto' },        
        { prop: 'opts'}
      ];
    
      rows: any;
      limit: number = 10;

    constructor(private ofertaServices: OfertasService,
                private _alertService: AlertsService,
                private productosService:ProductosService) {
    }

    ngOnInit() {
        this.getOfertas();
        this.getAllProductos();
    }

    getOfertas() {
        this.ofertaServices._getOfertas().subscribe(
            resp => {                
                this.listOfertas = resp;
                this.rows = [...this.listOfertas];
            }
        )
    }

    getAllProductos(){
        this.productosService._getProductos().subscribe(
            resp => {
                this.lista_productos = resp;
            }
        )
    }

    upImagen(event) {
        let imagen_x: File = event.target.files[0];
        this.form_ofertas.imagen = imagen_x;
    }

    upImagenEdit(event) {
        let imagen_x: File = event.target.files[0];
        this.edit_form_ofertas.imagen = imagen_x;
    }

    add_updateOferta(x) {
        this.inPromise = true;
        var formData: FormData = new FormData();
        formData.append('imagen', this.form_ofertas.imagen);
        formData.append('titulo', this.form_ofertas.titulo);
        formData.append('tiempoExpi', this.form_ofertas.tiempoExpi);
        formData.append('status', this.form_ofertas.status);
        formData.append('idProducto', this.form_ofertas.idProducto);
        formData.append('base_cond', this.form_ofertas.base_cond);
        
        if (x == 'add') {
            this.ofertaServices._addOfertas(formData).subscribe(
                resp => {
                    this.getOfertas();
                    this.form_ofertas = {idOferta: null, titulo: null, tiempoExpi: null, imagen: null, status: true}
                    this._alertService.msg("OK", "Éxito", "Se guardó correctamente");
                    $("#agregarOfertaModal").modal('hide');
                    this.inPromise = false;
                },
                error => {
                    this.inPromise = false;
                    
                    this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);

                    if (error.error.errors.titulo != null) {
                        this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.titulo}`);
                    }
                    if (error.error.errors.tiempoExpi != null) {
                        this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.tiempoExpi}`);
                    }
                    if (error.error.errors.status != null) {
                        this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.status}`);
                    }
                    if (error.error.errors.imagen != null) {
                        this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.imagen}`);
                    }

                }
            )
        }


    }

    editOferta(data: any) {
        this.ofertaServices._showOferta(data.idOferta).subscribe(
            (resp: any) => {
                this.edit_form_ofertas = resp.oferta
                $("#editarOfertaModal").modal('show');
            }
        )
    }

    upgrade() {
        this.inPromise = true;
        var formData: FormData = new FormData();
        formData.append('imagen', this.edit_form_ofertas.imagen);
        formData.append('titulo', this.edit_form_ofertas.titulo);
        formData.append('tiempoExpi', this.edit_form_ofertas.tiempoExpi);
        formData.append('status', this.edit_form_ofertas.status);
        formData.append('idOferta', this.edit_form_ofertas.idOferta);
        formData.append('idProducto', this.edit_form_ofertas.idProducto);
        formData.append('base_cond', this.edit_form_ofertas.base_cond);

        this.ofertaServices._upgradeOferta(this.edit_form_ofertas.idOferta, formData).subscribe(
            resp => {
                this.getOfertas();
                this.editOferta(this.edit_form_ofertas.idOferta)
                $("#editarOfertaModal").modal('hide');
                this.edit_form_ofertas = {idOferta: null, titulo: null, tiempoExpi: null, imagen: null}
                this._alertService.msg("OK", "Éxito", "Se editó correctamente");
                this.inPromise = false;
            },
            error => {
                this.inPromise = false;
                this._alertService.msg("ERR", "Error", `Error: ${error.error}`);

                if (error.error.errors.image[0] != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.image[0]}`);
                }

            }
        )

    }


    eliminarOferta(id: number) {
        this.ofertaServices._deleteOfertas(id).subscribe(
            resp => {
                this.getOfertas();
                this._alertService.msg('OK', 'Se elimino correctamente');
            },
            error => {
                this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
            }
        )
    }


    updateFilter(event){
        const val = event.target.value.toLowerCase();
    
        const temp = this.listOfertas.filter(function(d) {
          return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val) 
          || (d.tiempoExpi.toLowerCase().indexOf(val) !== -1 || !val);
        });
    
        this.rows = temp;
        this.table.offset = 0;//Requerido
      }
    

}
