import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CarritoService, Item ,detallesCompra } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import * as moment from 'moment';
import { DomicilioEntregaService } from '../../../services/domicilio-entrega.service';
import { UserTokenService } from '../../../services/user-token.service';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';


@Component({
  selector: 'app-carrito-form',
  templateUrl: './carrito-form.component.html',
  styleUrls: ['./carrito-form.component.css']
})
export class CarritoFormComponent implements OnInit {

  @Output('onSectionChange') onSectionChange = new EventEmitter();
  @Input('section') section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' | 'detalleCompra' = 'deliveryMethod';

  inPromise: boolean;
  link_mercadopago:string;
  link_mercadopago2:string;

 
  orderForm: FormGroup;
  interiorForm: FormGroup;
  inMarketForm: FormGroup;
  metodoDePago:string;
  metodoEntrega: 'internalDelivery' | 'delivery' | 'inMarketForm' ='inMarketForm' ;
  onDomicilioAdd: boolean = false;

  check: 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' = 'inMarket';

  actualDate: string;
  twoDaysAfter: string;

  disponibilidadEnHrsList: string[] = [];

  identidadTipo:string[] =["DNI","PASAPORTE"];
  identidadSeleccionada: 'DNI' | 'PASAPORTE' = 'DNI';
  imgLoaded: File;

  onLocalidadesFetch: boolean;
  localidadesList: any[];
  domiciliosList: any[] = [];
    
  dniValidator:boolean=false; 
  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private productosService: ProductosService,
    private localidadService: LocalidadService,
    private as: AlertsService,
    private domicilioService: DomicilioEntregaService,
    private userService: UserTokenService,
    private footerConfigService:ConfgFooterService,
    private mercadoPagoService:MercadoPagoService

  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      localidad: ['', Validators.required],
      fecha: ['', Validators.required],
      disponibilidad:['', Validators.required],
      domicilioEntrega:['', Validators.required],
      authorizedPerson: ['', Validators.required],
      identidad: ['', Validators.required],
      authorizedPersonDni: ['', [Validators.required, Validators.pattern(new RegExp(/^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$/))]], 
      authorizedPersonPasaporte: ['',Validators.required],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
      observations: [''],
    });

    this.interiorForm = this.fb.group({
      domicilioEntrega: ['', Validators.required],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(new RegExp(/^([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4}|\d{4})$/))]],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
    });

    this.inMarketForm = this.fb.group({
      fechaRetiro: ['', Validators.required],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
    });

    this.onLocalidadesFetch = true;
    this.getLinkMercadoPAgo()
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
    this.interiorForm.valueChanges.subscribe(values => {
      //Validación del la fecha de entrega
      

      //Por acá se maneja el método de pago y la imagen que se carga
      if(values.metodoDePago === "2" || values.metodoDePago === '3'){
        if(!this.imgLoaded){
          this.interiorForm.controls['imagen'].setErrors({'error': true});
        }else{
          this.interiorForm.controls['imagen'].setErrors(null);
        }
      }else{
        this.interiorForm.controls['imagen'].setErrors(null);
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

  routeTo(section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' | 'detalleCompra'){
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
    }else if(section === 'internalDelivery'){
      this.interiorForm.patchValue({image: value});
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

    if(!Array.isArray(respIdPerfilCliente.body)){
      this.as.msg('INFO', 'Info', 'Usted no posee un perfil de cliente, por lo tanto la información de los domicilios no puede ser cargada.');
      return;
    }

    let idPerfilCliente = 0;
    if(respIdPerfilCliente.ok){
      idPerfilCliente = respIdPerfilCliente.body[0].idPerfilCliente;
    }

    const resp = await this.domicilioService.getAll(idUser.toString()).toPromise();

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

    this.save(orderBody, total, type);
  }

  async saveOrderBody(idOrderHeader, orderBody){
    const resp = await this.productosService.orderBody(orderBody, idOrderHeader).toPromise();

    return resp;
  }

  async save(orderBody: any[], total: number, type: 'inMarketForm' | 'delivery' | 'internalDelivery'){
    
    let body: FormData = new FormData();
    this.metodoEntrega = type;
    /**
     * Para setear el cuerpo de la petición
     * se pregunta el tipo de formulario
     */
    if(type === 'inMarketForm'){

      const values = this.inMarketForm.value;
      this.metodoDePago = values.metodoDePago == 1 ?  'Efectivo': values.metodoDePago == 2 ? 'Depósito' : 'Transferencia';
      
      body.append('fecha_retiro', values.fechaRetiro);
      body.append('metodoPago', this.metodoDePago);
      body.append('monto_total', total.toString());
      body.append('metodoEntrega', '1');

      if(values.metodoDePago !== 1){
        body.append('comprobanteDepositoTransferencia', this.imgLoaded);
      }

    }else if(type === 'delivery'){

      const values = this.orderForm.value;
      this.metodoDePago = values.metodoDePago == 1 ? 'Efectivo': 
        values.metodoDePago == 2 ? 'Depósito' : 
        values.metodoDePago == 3 ?  'Transferencia' : 'MercadoPago';

      body.append('metodoEntrega', '2');
      body.append('monto_total', total.toString());
      body.append('metodoPago', this.metodoDePago);

      
      body.append('localidad', values.localidad);
      body.append('fecha', values.fecha);
      body.append('disponibilidadHr', values.disponibilidad);
      body.append('Domicilio_Entrega', values.domicilioEntrega);
      body.append('personasAutorizadas', values.authorizedPerson);
      body.append('observaciones', values.observations);

      if(values.metodoDePago !== 1 && values.metodoDePago !== 4){
        body.append('comprobanteDepositoTransferencia', this.imgLoaded);
      }
      if(values.identidad == "DNI" ){
        body.append('DNIautorizado',values.authorizedPersonDni);
      }else{
        body.append('DNIautorizado',values.authorizedPersonPasaporte);
      }
      
      
    }else{
      const values = this.interiorForm.value;
       this.metodoDePago = values.metodoDePago == 1 ? 'Efectivo': 
      values.metodoDePago == 2 ? 'Depósito' : 
      values.metodoDePago == 3 ?  'Transferencia' : 'MercadoPago';

      body.append('metodoEntrega', '3');
      body.append('monto_total', total.toString());
      body.append('Domicilio_Entrega', values.domicilioEntrega);
      body.append('localidad', values.localidad);
      body.append('Codigo_Postal', values.codigoPostal);
      body.append('direccion', values.direccion);
      body.append('metodoPago', this.metodoDePago);

      if(values.metodoDePago !== 1 && values.metodoDePago !== 4){
        body.append('comprobanteDepositoTransferencia', this.imgLoaded);
      }

    }

    this.inPromise = true;
    const respOrderHeader = await this.productosService.orderHeader(body).toPromise();
    
    if(!respOrderHeader.ok){
      this.inPromise = false;
      
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al crear la orden');
      return;
    }
  
    const idOrder = respOrderHeader.body.OB.idOrderHeader;
    const Numero_Pedido = respOrderHeader.body.OB.Numero_Pedido;
    const unit_price= respOrderHeader.body.OB.monto_total;
   /*   const respOrderBody = await this.saveOrderBody(idOrder, orderBody); 

    if(!respOrderBody.ok){
      this.inPromise = false;
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al actualizar la lista de productos, comuniquese con un administrador');
      return;
    } */  
    
    
    this.setLastOrderDetail( total,this.metodoDePago); 
    this.as.msg('OK', 'Éxito', 'Su pedido ha sido procesado');
    this.goToMercadoPago(idOrder,Numero_Pedido,unit_price);
    if(this.metodoDePago!='MercadoPago'){
      this.routeTo('detalleCompra');
      this.carritoService.clear();
    }
   
    

  }
  goToMercadoPago(idOrder:any,Numero_Pedido:any,unit_price:any){  // si elije mercado pago redirecionar a una pagina obtenida desde un servicio
    if(this.metodoDePago==='MercadoPago'){
      this.mercadoPagoService.getDataPago({idOrderHeader:idOrder,Numero_Pedido:Numero_Pedido,unit_price:unit_price}).subscribe(resp=>{
        if(resp.body){
          //crear json para l siguiente servicio que retornara la url 
          const precio:number =  resp.body.unit_price;
          const data={
            "clienteid": resp.body.clienteid,
            "clientesecret": resp.body.clientesecret,
            "currency_id": resp.body.currency_id,
            "id": resp.body.id,
            "title": resp.body.title,
            "unit_price": Number(resp.body.unit_price),
            "uri": resp.body.uri
            }
        
          this.mercadoPagoService.getDataMercadoPago(data).subscribe((val)=>{
          
            if(val){
              console.log("exist");
              if(val.ok && val.body){
             
                window.open(val.body,'_blank');
              }else if(val.status == 404){
                console.log("error");
                this.as.msg('ERR', 'Error', 'Link a Mercado Pago No Encontrado');
              }
            }
            this.routeTo('detalleCompra');
            this.carritoService.clear();
          })
          
        }else{
          this.as.msg('ERR', 'Error', 'error');
          this.routeTo('detalleCompra');
          this.carritoService.clear();
          console.error("error");
        }
      })
    }
  }
  validDni(){
    
    if(this.orderForm.value.identidad=="DNI"){
      this.orderForm.get("authorizedPersonPasaporte").clearValidators();
      this.orderForm.get("authorizedPersonPasaporte").updateValueAndValidity();

      this.orderForm.get("authorizedPersonDni").setValidators([Validators.required, Validators.pattern(new RegExp(/^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$/))]);
      this.orderForm.get("authorizedPersonDni").updateValueAndValidity();

       setTimeout(() =>this.dniValidator=true , 2000);

    }else if(this.orderForm.value.identidad=="PASAPORTE"){
      this.orderForm.get("authorizedPersonDni").clearValidators();
      this.orderForm.get("authorizedPersonDni").updateValueAndValidity();

      this.orderForm.get("authorizedPersonPasaporte").setValidators([Validators.required]);
      this.orderForm.get("authorizedPersonPasaporte").updateValueAndValidity();

    }
  }
  getLinkMercadoPAgo(){
    this.footerConfigService._getConfigFooter().subscribe(
      (resp:any) => {   
        if(resp){
         
          
          this.link_mercadopago = resp.url_mercadopago;
     
        }     
      }
    )      
  }
  route_Mpago(){
    /* window.location.href=this.link_mercadopago; */ // abre el link en la pestaña actual
    window.open(this.link_mercadopago,'_blank');  // abre el link en una nueva pestaña
  }
  // crear detalles de la ultima compra
  setLastOrderDetail( total :number , metodoDePago:string){
     const data:detallesCompra={
      metodoEntrega: this.metodoEntrega,
      metodoDePago: metodoDePago,
      productos :this.carritoService.getAll(),
      total:total
     }
    
    this.carritoService.setDetallesLastOrder(data);
  }
 

}
