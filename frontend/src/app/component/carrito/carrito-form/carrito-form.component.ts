import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CarritoService, Item } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import * as moment from 'moment';
import { DomicilioEntregaService } from '../../../services/domicilio-entrega.service';
import { UserTokenService } from '../../../services/user-token.service';

@Component({
  selector: 'app-carrito-form',
  templateUrl: './carrito-form.component.html',
  styleUrls: ['./carrito-form.component.css']
})
export class CarritoFormComponent implements OnInit {

  @Output('onSectionChange') onSectionChange = new EventEmitter();
  @Input('section') section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' = 'deliveryMethod';

  inPromise: boolean;

  orderForm: FormGroup;
  interiorForm: FormGroup;
  inMarketForm: FormGroup;

  onDomicilioAdd: boolean = false;

  check: 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' = 'inMarket';

  actualDate: string;
  twoDaysAfter: string;

  disponibilidadEnHrsList: string[] = [];

  imgLoaded: File;

  onLocalidadesFetch: boolean;
  localidadesList: any[];
  domiciliosList: any[] = [];
    
  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private productosService: ProductosService,
    private localidadService: LocalidadService,
    private as: AlertsService,
    private domicilioService: DomicilioEntregaService,
    private userService: UserTokenService
  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      localidad: ['', Validators.required],
      fecha: ['', Validators.required],
      disponibilidad:['', Validators.required],
      domicilioEntrega:['', Validators.required],
      authorizedPerson: ['', Validators.required],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
      observations: [''],
    });

    this.interiorForm = this.fb.group({
      domicilioEntrega: ['', Validators.required],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(new RegExp(/^([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4}|\d{4})$/))]]
    });

    this.inMarketForm = this.fb.group({
      fechaRetiro: ['', Validators.required],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
    });

    this.onLocalidadesFetch = true;
    this.getAllDomicilios().then(
      () => {
        this.getAllLocalidades();
        this.setMommentDates();
      }
    );
  }

  

  setMommentDates(){
    this.actualDate = moment().toJSON().split('T')[0];
    this.twoDaysAfter = moment().add(1, 'days').toJSON().split('T')[0];

    this.inMarketForm.valueChanges.subscribe(values =>  {
      //Validación del la fecha de retiro
      if(values.fechaRetiro < this.actualDate || values.fechaRetiro > this.twoDaysAfter){
        this.inMarketForm.controls['fechaRetiro'].setErrors({'error': true});
      }else{
        this.inMarketForm.controls['fechaRetiro'].setErrors(null);
      }

      //Por acá se maneja el método de pago y la imagen que se carga
      if(values.metodoDePago === "2" || values.metodoDePago === '3'){
        if(!this.imgLoaded){
          this.inMarketForm.controls['imagen'].setErrors({'error': true});
        }else{
          this.inMarketForm.controls['imagen'].setErrors(null);          
        }
      }else{
        this.inMarketForm.controls['imagen'].setErrors(null);
        this.imgLoaded = null;
      }
    });
    
    this.orderForm.valueChanges.subscribe(values => {
      //Validación del la fecha de entrega
      if(values.fecha < this.twoDaysAfter){
        this.orderForm.controls['fecha'].setErrors({'error': true});
      }else{
        this.orderForm.controls['fecha'].setErrors(null);
      }

      //Por acá se maneja el método de pago y la imagen que se carga
      if(values.metodoDePago === "2" || values.metodoDePago === '3'){
        if(!this.imgLoaded){
          this.orderForm.controls['imagen'].setErrors({'error': true});
        }else{
          this.orderForm.controls['imagen'].setErrors(null);
        }
      }else{
        this.orderForm.controls['imagen'].setErrors(null);
        this.imgLoaded = null;
      }

    });

    //Para setear la disponibilidad e hrs
    let startDate = moment(this.twoDaysAfter);
    for(let i=0; i<24; i++){
      this.disponibilidadEnHrsList.push(startDate.add(i, 'hours').format('LT'));
      startDate = moment(this.twoDaysAfter);
    }
  }

  routeTo(section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm'){
    this.onSectionChange.emit(section);
    this.section = section;
  }

  checkDeliveryMethod(check: 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm'){
    this.check = check;
  }

  onFileChange(event, section) {
    if(event.target.files && event.target.files.length) {
      const fileTo: File = event.target.files[0];

      if(!fileTo.type.includes('image/png') 
        && !fileTo.type.includes('image/jpg') 
        && !fileTo.type.includes('image/jpeg') ){
          this.as.msg('ERR','Error:', 'El archivo no es admitido o no es una imagen');
          this.setFormImageValue(section, null);

          return;
      }

      if(fileTo.size > 5000000){
          this.as.msg('ERR','Error:', 'El archivo es muy pesado');
          this.setFormImageValue(section, null);
          return;
      }

      this.imgLoaded = fileTo;
      this.setFormImageValue(section, fileTo);
    }
  }

  setFormImageValue(section, value){
    if(!value){
      this.imgLoaded = null;
    }

    if(section === 'inMarketForm'){
      this.inMarketForm.patchValue({image: value});
    }else if(section === 'delivery'){
      this.orderForm.patchValue({image: value});
    }
  }

  onDomicilioCreate(bool: boolean){
    this.onDomicilioAdd = bool;

    if(!bool){
      //update domicilio entrega box
      this.getAllDomicilios();
    }
  }

  async getAllDomicilios(){
    const idUser = this.userService.getUserId();
    const respIdPerfilCliente = await this.domicilioService.getIdPerfilBy(idUser.toString()).toPromise();

    if(!respIdPerfilCliente.ok){
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al obtener el perfil del cliente');
      return;
    }

    let idPerfilCliente = 0;
    if(respIdPerfilCliente.ok){
      idPerfilCliente = respIdPerfilCliente.body[0].idPerfilCliente;
    }

    const resp = await this.domicilioService.getAll(idPerfilCliente.toString()).toPromise();

    if(resp.ok){
      this.domiciliosList = resp.body;
    }
  }

  getAllLocalidades(){
    this.localidadService.getAll().subscribe(
      (resp) => {
        if(resp.ok && resp.status === 200){
          this.localidadesList = resp.body;
        }else{
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Listar Localidades');
        }
        this.onLocalidadesFetch = false;
      }, (error) => {
        this.onLocalidadesFetch = false;
        console.error(error);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Listar Localidades');
      }
    )
  }

  //TODO
  createOrder(type: 'internalDelivery' | 'delivery' | 'inMarketForm'){

    const total = this.carritoService.getTotal();
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

    switch(type){
      case 'internalDelivery': 
      case 'delivery':
      case 'inMarketForm': this.inMarketSave(orderBody, total);
      default : return;
    }
    /*
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
    });*/
  }

  async saveOrderBody(idOrderHeader, orderBody){
    const resp = await this.productosService.orderBody(orderBody, idOrderHeader).toPromise();

    return resp;
  }

  async inMarketSave(orderBody: any[], total: number){

    const values = this.inMarketForm.value;
    const metodoDePago = values.metodoDePago === 1 ? 'Efectivo': values.metodoDePago === 2 ? 'Depósito' : 'Transferencia';

    let body: FormData = new FormData()
    
    body.append('fecha_retiro', values.fechaRetiro);
    body.append('metodoPago', metodoDePago);
    body.append('monto_total', total.toString());
    body.append('metodoEntrega', '1');

    if(values.metodoDePago !== 1){
      body.append('comprobanteDepositoTransferencia', this.imgLoaded);
    }

    this.inPromise = true;
    const respOrderHeader = await this.productosService.orderHeader(body).toPromise();
    
    if(!respOrderHeader.ok){
      this.inPromise = false;
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al crear la orden');
      return;
    }

    const idOrder = respOrderHeader.body.OB.idOrderHeader;

    const respOrderBody = await this.saveOrderBody(idOrder, orderBody);

    if(!respOrderBody.ok){
      this.inPromise = false;
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al actualizar la lista de productos, comuniquese con un administrador');
      return;
    }

    this.as.msg('OK', 'Éxito', 'Se ha creado el pedido');
    this.section = 'shipping';
    this.carritoService.clear();
    
  }

}
