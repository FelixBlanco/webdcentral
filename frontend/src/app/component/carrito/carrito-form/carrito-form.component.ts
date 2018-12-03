import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CarritoService, Item } from 'src/app/services/carrito.service';
import { ProductosService, PedidoHeader } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-carrito-form',
  templateUrl: './carrito-form.component.html',
  styleUrls: ['./carrito-form.component.css']
})
export class CarritoFormComponent implements OnInit {

  @Output('onSectionChange') onSectionChange = new EventEmitter();
  @Input('section') section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' = 'deliveryMethod';

  inPromise: boolean;

  orderForm: FormGroup;

  check: 'inMarket' | 'delivery' = 'inMarket';
    
  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private productosService: ProductosService,
    private as: AlertsService,
  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      localidad: ['', Validators.required],
      direccionEnvio: ['', Validators.required],
      disponibilidad:['', Validators.required],
      tiposFacturacion:['', Validators.required],
      cuit: [''],
      razonSocial: [''],
      domicilioFiscal: [''],
      metodoDePago:['1', Validators.required]
      //codPostal: ['', [Validators.required, Validators.pattern(new RegExp(/^([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4}|\d{4})$/))]]
    });

    this.orderForm.valueChanges.subscribe((values) => {
      console.log('form', values);
    })
  }

  routeTo(section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery'){
    this.onSectionChange.emit(section);
    this.section = section;
  }

  checkDeliveryMethod(check: 'inMarket' | 'delivery'){
    this.check = check;
  }

  createOrder(){
    const val = this.orderForm.value;
    const body = new HttpParams()
      .set("Domicilio_Entrega", val.direccion)
      .set("Codigo_Postal", val.codPostal)
      .set("comentaryClient", val.comentario)
      .set("stars", "0");
    
    const carritoItems: Item[] =  this.carritoService.getAll();
    let orderBody: any[] = []

    carritoItems.forEach(val => {
      orderBody.push({
        codeProdSys: val.id,
        Cantidad_Producto: val.cantidad,
        PrecioUnitario_Producto: val.precio,
        PorcentajeDescuento_Producto: 0,
        Numero_EncabezadoVenta: 0,
        Devolucion_Producto: 0
      });
    });

    this.inPromise = true;
    this.productosService.orderHeader(body.toString()).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        const pedidoCreated: PedidoHeader = resp.body.OB;

        this.productosService.orderBody({items: orderBody}, pedidoCreated.idOrderHeader).subscribe(resp => {
          if(resp.ok && resp.status === 201){
            this.as.msg('OK', 'Éxito', 'Se ha creado el pedido');
            this.section = 'shipping';
            this.carritoService.clear();
            this.orderForm.reset();
            
          }else{
            console.error(resp);
            this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
          }
          this.inPromise = false;
        }, error => {
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
          this.inPromise = false;
          console.error(error);
        });
        
      }else{
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        this.inPromise = false;
        console.error(resp);
      }
    }, error => {
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno')
      this.inPromise = false;
      console.error(error);
    });
  }

}
