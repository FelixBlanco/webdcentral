import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CarritoService, Item, detallesCompra } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import * as moment from 'moment';
import { DomicilioEntregaService } from '../../../services/domicilio-entrega.service';
import { UserTokenService } from '../../../services/user-token.service';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';
import { PerfilClienteService } from 'src/app/services/perfil-cliente.service';

/* import { runInThisContext } from 'vm'; */
declare var $;

@Component({
  selector: 'app-carrito-form',
  templateUrl: './carrito-form.component.html',
  styleUrls: ['./carrito-form.component.css']
})
export class CarritoFormComponent implements OnInit {

  @Output('onSectionChange') onSectionChange = new EventEmitter();
  @Input('section') section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' | 'detalleCompra' = 'deliveryMethod';
  detailOrder: detallesCompra;
  inPromise: boolean;
  link_mercadopago: string;
  link_mercadopago2: string;
  inPromiseM_pago: Boolean = false;
  pedidoRealizado: boolean = false;
  orderForm: FormGroup;
  interiorForm: FormGroup;
  inMarketForm: FormGroup;
  metodoDePago: string;
  Numero_Pedido: any = null;
  recomprarProduct: boolean = false;
  metodoEntrega: 'internalDelivery' | 'delivery' | 'inMarketForm' = 'inMarketForm';
  onDomicilioAdd: boolean = false;
  reservaMercaderiaHrs: number;
  check: 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' = 'inMarket';

  actualDate: string;
  twoDaysAfter: string;

  disponibilidadEnHrsList: string[] = [];

  identidadTipo: string[] = ["DNI", "PASAPORTE"];
  identidadSeleccionada: 'DNI' | 'PASAPORTE' = 'DNI';
  imgLoaded: File;

  onLocalidadesFetch: boolean;
  localidadesList: any[];
  domiciliosList: any[] = [];

  dniValidator: boolean = false;
  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private productosService: ProductosService,
    private localidadService: LocalidadService,
    private as: AlertsService,
    private domicilioService: DomicilioEntregaService,
    private userService: UserTokenService,
    private footerConfigService: ConfgFooterService,
    private mercadoPagoService: MercadoPagoService,
    private perfilClienteService: PerfilClienteService

  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      localidad: [''],
      fecha: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      domicilioEntrega: ['', Validators.required],
      authorizedPerson: [''],
      identidad: [''],
      authorizedPersonDni: [''],
      authorizedPersonPasaporte: [''],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
      observations: [''],
    });

    this.interiorForm = this.fb.group({
      domicilioEntrega: ['', Validators.required],
      localidad: ['', Validators.required],
      identidad: ['', Validators.required],
      authorizedPerson: ['', Validators.required],
      authorizedPersonDni: ['', [Validators.required, Validators.pattern(new RegExp(/^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$/))]],
      authorizedPersonPasaporte: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(new RegExp(/^([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4}|\d{4})$/))]],
      metodoDePago: ['2', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      imagen: [''],
    });

    this.inMarketForm = this.fb.group({
      fechaRetiro: ['', Validators.required],
      metodoDePago: ['1', Validators.required],
      imagen: [''],
    });

    this.onLocalidadesFetch = true;
    this.getLinkMercadoPAgo()
   
    this.carritoService.orderDetails.subscribe(val => {
      if (val) {

        this.detailOrder = val;
        this.pedidoRealizado = val.pedidoRealizado;
        this.recomprarProduct = val.recomprar;
        console.log("detailcompraevent")
        this.routeTo('detalleCompra');
      }
    })
    this.footerConfigService._getConfigFooter().subscribe(resp => {
      if (resp) {
        const hrsHabiles=Number(resp['reservaMercaderiaHrs']);
        if(hrsHabiles){
          this.reservaMercaderiaHrs=hrsHabiles;
        }else
        {
          this.reservaMercaderiaHrs=48;

        }

      }else{
        
        this.reservaMercaderiaHrs= 48;
      }
      this.getAllDomicilios().then(
        () => {
          this.getAllLocalidades();
          this.setMommentDates();
        }
      );
    })
  }



  setMommentDates() {
    const diasHabiles= this.reservaMercaderiaHrs/24;
    console.log(diasHabiles);
    this.actualDate = moment().toJSON().split('T')[0];
    this.twoDaysAfter = moment().add(diasHabiles, 'days').toJSON().split('T')[0];

    this.inMarketForm.valueChanges.subscribe(values => {
      //Validación del la fecha de retiro
      if (values.fechaRetiro < this.actualDate || values.fechaRetiro > this.twoDaysAfter) {
        this.inMarketForm.controls['fechaRetiro'].setErrors({ 'error': true });
      } else {
        this.inMarketForm.controls['fechaRetiro'].setErrors(null);
      }

      //Por acá se maneja el método de pago y la imagen que se carga
      if (values.metodoDePago === "2" || values.metodoDePago === '3') {
        if (!this.imgLoaded) {
          this.inMarketForm.controls['imagen'].setErrors({ 'error': true });
        } else {
          this.inMarketForm.controls['imagen'].setErrors(null);
        }
      } else {
        this.inMarketForm.controls['imagen'].setErrors(null);
        this.imgLoaded = null;
      }
    });

    this.orderForm.valueChanges.subscribe(values => {
      //Validación del la fecha de entrega
      if (values.fecha < this.twoDaysAfter) {
        this.orderForm.controls['fecha'].setErrors({ 'error': true });
      } else {
        this.orderForm.controls['fecha'].setErrors(null);
      }

      //Por acá se maneja el método de pago y la imagen que se carga
      if (values.metodoDePago === "2" || values.metodoDePago === '3') {
        if (!this.imgLoaded) {
          this.orderForm.controls['imagen'].setErrors({ 'error': true });
        } else {
          this.orderForm.controls['imagen'].setErrors(null);
        }
      } else {
        this.orderForm.controls['imagen'].setErrors(null);
        this.imgLoaded = null;
      }

    });
    this.interiorForm.valueChanges.subscribe(values => {
      //Validación del la fecha de entrega


      //Por acá se maneja el método de pago y la imagen que se carga
      if (values.metodoDePago === "2" || values.metodoDePago === '3') {
        if (!this.imgLoaded) {
          this.interiorForm.controls['imagen'].setErrors({ 'error': true });
        } else {
          this.interiorForm.controls['imagen'].setErrors(null);
        }
      } else {
        this.interiorForm.controls['imagen'].setErrors(null);
        this.imgLoaded = null;
      }

    });



    //Para setear la disponibilidad e hrs
    let startDate = moment(this.twoDaysAfter);
    for (let i = 0; i < 24; i++) {
      this.disponibilidadEnHrsList.push(startDate.add(i, 'hours').format('LT'));
      startDate = moment(this.twoDaysAfter);
    }
  }

  routeTo(section: 'shipping' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm' | 'detalleCompra') {
    this.onSectionChange.emit(section);
    this.section = section;
  }

  checkDeliveryMethod(check: 'inMarket' | 'delivery' | 'internalDelivery' | 'inMarketForm') {
    this.check = check;
  }

  onFileChange(event, section) {
    if (event.target.files && event.target.files.length) {
      const fileTo: File = event.target.files[0];

      if (!fileTo.type.includes('image/png')
        && !fileTo.type.includes('image/jpg')
        && !fileTo.type.includes('image/jpeg')) {
        this.as.msg('ERR', 'Error:', 'El archivo no es admitido o no es una imagen');
        this.setFormImageValue(section, null);

        return;
      }

      if (fileTo.size > 5000000) {
        this.as.msg('ERR', 'Error:', 'El archivo es muy pesado');
        this.setFormImageValue(section, null);
        return;
      }

      this.imgLoaded = fileTo;
      this.setFormImageValue(section, fileTo);
    }
  }

  setFormImageValue(section, value) {
    if (!value) {
      this.imgLoaded = null;
    }

    if (section === 'inMarketForm') {
      this.inMarketForm.patchValue({ image: value });
    } else if (section === 'delivery') {
      this.orderForm.patchValue({ image: value });
    } else if (section === 'internalDelivery') {
      this.interiorForm.patchValue({ image: value });
    }
  }

  onDomicilioCreate(bool: boolean) {
    this.onDomicilioAdd = bool;

    if (!bool) {
      //update domicilio entrega box
      this.getAllDomicilios();
    }
  }

  async getAllDomicilios() {
    const idUser = this.userService.getUserId();
    const respIdPerfilCliente = await this.domicilioService.getIdPerfilBy(idUser.toString()).toPromise();

    if (!respIdPerfilCliente.ok) {
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al obtener el perfil del cliente');
      return;
    }

    if (!Array.isArray(respIdPerfilCliente.body)) {
      this.as.msg('INFO', 'Info', 'Usted no posee un perfil de cliente, por lo tanto la información de los domicilios no puede ser cargada.');
      return;
    }

    let idPerfilCliente = 0;
    if (respIdPerfilCliente.ok) {
      idPerfilCliente = respIdPerfilCliente.body[0].idPerfilCliente;
    }

    const resp = await this.domicilioService.getAll(idUser.toString()).toPromise();

    if (resp.ok) {
      this.domiciliosList = resp.body;
    }
  }

  getAllLocalidades() {
    this.localidadService.getAll().subscribe(
      (resp) => {
        if (resp.ok && resp.status === 200) {
          this.localidadesList = resp.body;
        } else {
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
  createOrder(type: 'internalDelivery' | 'delivery' | 'inMarketForm') {

    const total = this.carritoService.getTotal();
    const carritoItems: Item[] = this.carritoService.getAll();

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

  async saveOrderBody(idOrderHeader, orderBody) {
    const resp = await this.productosService.orderBody(orderBody, idOrderHeader).toPromise();

    return resp;
  }

  async save(orderBody: any[], total: number, type: 'inMarketForm' | 'delivery' | 'internalDelivery') {

    let body: FormData = new FormData();
    this.metodoEntrega = type;
    /**
     * Para setear el cuerpo de la petición
     * se pregunta el tipo de formulario
     */
    if (type === 'inMarketForm') {

      const values = this.inMarketForm.value;
      this.metodoDePago = values.metodoDePago == 1 ? 'Efectivo' :
        values.metodoDePago == 2 ? 'Depósito' :
          values.metodoDePago == 3 ? 'Transferencia' : values.metodoDePago == 4 ? 'MercadoPago' : 'Tarjeta';

      body.append('fecha_retiro', values.fechaRetiro);
      body.append('metodoPago', this.metodoDePago);
      body.append('monto_total', total.toString());
      body.append('metodoEntrega', '1');

      if (values.metodoDePago !== 1) {
        body.append('comprobanteDepositoTransferencia', this.imgLoaded);
      }

    } else if (type === 'delivery') {

      const values = this.orderForm.value;
      this.metodoDePago = values.metodoDePago == 1 ? 'Efectivo' :
        values.metodoDePago == 2 ? 'Depósito' :
          values.metodoDePago == 3 ? 'Transferencia' : values.metodoDePago == 4 ? 'MercadoPago' : 'Tarjeta';

      body.append('metodoEntrega', '2');
      body.append('monto_total', total.toString());
      body.append('metodoPago', this.metodoDePago);


      body.append('localidad', values.localidad);
      body.append('fecha', values.fecha);
      body.append('disponibilidadHr', values.disponibilidad);
      body.append('Domicilio_Entrega', values.domicilioEntrega);
      body.append('personasAutorizadas', values.authorizedPerson);
      body.append('observaciones', values.observations);
      body.append('tipoIdentidad', values.identidad);
      if (values.metodoDePago !== 1 && values.metodoDePago !== 4) {
        body.append('comprobanteDepositoTransferencia', this.imgLoaded);
      }
      if (values.identidad == "DNI") {
        body.append('DNIautorizado', values.authorizedPersonDni);
      } else {
        body.append('pasarpoteAutorizado', values.authorizedPersonPasaporte);
      }


    } else {
      const values = this.interiorForm.value;
      this.metodoDePago = values.metodoDePago == 1 ? 'Efectivo' :
        values.metodoDePago == 2 ? 'Depósito' :
          values.metodoDePago == 3 ? 'Transferencia' : values.metodoDePago == 4 ? 'MercadoPago' : 'Tarjeta';

      body.append('metodoEntrega', '3');
      body.append('monto_total', total.toString());
      body.append('Domicilio_Entrega', values.domicilioEntrega);
      body.append('localidad', values.localidad);
      body.append('Codigo_Postal', values.codigoPostal);
      body.append('direccion', values.direccion);
      body.append('metodoPago', this.metodoDePago);
      body.append('personasAutorizadas', values.authorizedPerson);
      body.append('provincia', values.provincia);
      body.append('telefonoAutorizado', values.telefono);
      body.append('celularAutorizado', values.celular);
      body.append('tipoIdentidad', values.identidad);




      if (values.metodoDePago !== 1 && values.metodoDePago !== 4) {
        body.append('comprobanteDepositoTransferencia', this.imgLoaded);
      }
      if (values.identidad == "DNI") {
        body.append('DNIautorizado', values.authorizedPersonDni);
      } else {
        console.log("pasaporte");
        body.append('pasarpoteAutorizado', values.authorizedPersonPasaporte);
      }


    }
    console.log("test")
    this.inPromise = true;
    const respOrderHeader = await this.productosService.orderHeader(body).toPromise();
    console.log(respOrderHeader);
    if (!respOrderHeader.ok) {
      this.inPromise = false;

      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al crear la orden');
      return;
    }

    const idOrder = respOrderHeader.body.OB.idOrderHeader;
    this.Numero_Pedido = respOrderHeader.body.OB.Numero_Pedido;
    const unit_price = respOrderHeader.body.OB.monto_total;
    const respOrderBody = await this.saveOrderBody(idOrder, orderBody);

    if (!respOrderBody.ok) {
      this.inPromise = false;
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al actualizar la lista de productos, comuniquese con un administrador');
      return;
    }



    this.as.msg('OK', 'Éxito', 'Su pedido ha sido procesado');
    this.carritoService.clear();
    this.goToMercadoPago(idOrder, this.Numero_Pedido, unit_price);
    this.inPromise = false;

    this.detailOrder.pedidoRealizado = true;
    this.detailOrder.numeroPedido = this.Numero_Pedido;
    this.carritoService.setDetailOrder(this.detailOrder);
    /* this.carritoService.setDetallesLastOrder(this.pedidoRealizado);
    this.carritoService.setDetallesLastOrderNumber(this.Numero_Pedido); */






  }
  goToMercadoPago(idOrder: any, Numero_Pedido: any, unit_price: any) {  // si elije mercado pago redirecionar a una pagina obtenida desde un servicio
    console.log(idOrder, Numero_Pedido, unit_price);
    if (this.metodoDePago === 'MercadoPago') {
      this.mercadoPagoService.getDataPago({ idOrderHeader: idOrder, Numero_Pedido: Numero_Pedido, unit_price: unit_price }).subscribe(resp => {
        if (resp.body) {
          console.log(resp.body);
          //crear json para l siguiente servicio que retornara la url 
          const precio: number = resp.body.unit_price;
          const data = {
            "clienteid": "852703498787697",//deberia ser resp.body.clienteid, pero por problemas con el api , le colocamos datos estaticos ,
            "clientesecret": "vJ23r7VROnkzgnKH7PPbOvJvoz1yleT2", //deberia ser resp.body.clientesecret, pero por problemas con el api , le colocamos datos estaticos resp.body.clientesecret,
            "currency_id": "ARG", // deberia ser resp.body.currency_id, pero por problemas con el api , le colocamos datos estaticos resp.body.currency_id,
            "id": resp.body.id,
            "title": resp.body.title,
            "unit_price": Number(resp.body.unit_price),
            "uri": "http://127.0.0.1:8000/api/v1/add/pago"   //resp.body.uri deberia ser 
          }
          console.log(data);

          this.mercadoPagoService.getDataMercadoPago(data).subscribe((val) => {

            if (val) {
              console.log("exist");
              if (val.ok && val.body) {

                window.open(val.body, '_blank');
              } else if (val.status == 404) {
                console.log("error");
                this.as.msg('ERR', 'Error', 'Link a Mercado Pago No Encontrado');
              }
            }

          }), error => {
            this.as.msg('ERR', 'Error', 'Link a Mercado Pago No Encontrado');
          }

        } else {
          this.as.msg('ERR', 'Error', 'error');

          console.error("error");
        }
      }), error => {
        this.as.msg('ERR', 'Error', error);
      }
    }
  }
  validateMethodPay() {
    //solo pedir personas autorizadas en delivery si el metodo de pago  es mercadoPago(value 4)
    if (this.orderForm.value.metodoDePago == 4) {

      /*   this.orderForm.get("authorizedPersonPasaporte").updateValueAndValidity(); */

      this.orderForm.get("authorizedPerson").setValidators([Validators.required]);
      this.orderForm.get("authorizedPerson").updateValueAndValidity();
      this.orderForm.get("identidad").setValidators([Validators.required]);
      this.orderForm.get("identidad").updateValueAndValidity();

      setTimeout(() => this.dniValidator = true, 2000);
    } else {
      this.orderForm.get("authorizedPerson").clearValidators();
      this.orderForm.get("authorizedPerson").updateValueAndValidity();

      this.orderForm.get("identidad").clearValidators();
      this.orderForm.get("identidad").updateValueAndValidity();
      this.orderForm.get("authorizedPersonDni").clearValidators();
      this.orderForm.get("authorizedPersonDni").updateValueAndValidity();
      this.orderForm.get("authorizedPersonPasaporte").clearValidators();
      this.orderForm.get("authorizedPersonPasaporte").updateValueAndValidity();

    }
  }
  validDni() {
    //validar dni o pasaporte para delivery
    if (this.orderForm.value.identidad == "DNI") {
      this.orderForm.get("authorizedPersonPasaporte").clearValidators();
      this.orderForm.get("authorizedPersonPasaporte").updateValueAndValidity();

      this.orderForm.get("authorizedPersonDni").setValidators([Validators.required, Validators.pattern(new RegExp(/^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$/))]);
      this.orderForm.get("authorizedPersonDni").updateValueAndValidity();

      setTimeout(() => this.dniValidator = true, 2000);

    } else if (this.orderForm.value.identidad == "PASAPORTE") {
      this.orderForm.get("authorizedPersonDni").clearValidators();
      this.orderForm.get("authorizedPersonDni").updateValueAndValidity();

      this.orderForm.get("authorizedPersonPasaporte").setValidators([Validators.required]);
      this.orderForm.get("authorizedPersonPasaporte").updateValueAndValidity();

    }
    //validar dni o pasaporte para despacho al interior
    if (this.interiorForm.value.identidad == "DNI") {
      this.interiorForm.get("authorizedPersonPasaporte").clearValidators();
      this.interiorForm.get("authorizedPersonPasaporte").updateValueAndValidity();

      this.interiorForm.get("authorizedPersonDni").setValidators([Validators.required, Validators.pattern(new RegExp(/^(0|[1-9][0-9]*|[1-9][0-9]{0,2}(,[0-9]{3,3})*)$/))]);
      this.interiorForm.get("authorizedPersonDni").updateValueAndValidity();

      setTimeout(() => this.dniValidator = true, 2000);

    } else if (this.interiorForm.value.identidad == "PASAPORTE") {
      this.interiorForm.get("authorizedPersonDni").clearValidators();
      this.interiorForm.get("authorizedPersonDni").updateValueAndValidity();

      this.interiorForm.get("authorizedPersonPasaporte").setValidators([Validators.required]);
      this.interiorForm.get("authorizedPersonPasaporte").updateValueAndValidity();

    }
  }
  getLinkMercadoPAgo() {
    this.inPromiseM_pago = true;
    this.footerConfigService._getConfigFooter().subscribe(
      (resp: any) => {
        this.inPromiseM_pago = false;
        if (resp) {


          this.link_mercadopago = resp.url_mercadopago;

        }
      }
    )
  }
  route_Mpago() {
    /* window.location.href=this.link_mercadopago; */ // abre el link en la pestaña actual
    window.open(this.link_mercadopago, '_blank');  // abre el link en una nueva pestaña
  }
  // crear detalles del pedido para confirmar antes de la compra
  setOrderDetail(metodoDePago: number) {
    //variables para verificar que el perfil no este en null
    let apellido;
    let nombre;
    let DNI;
    // verificamos que el usuario tenga un perfil registrado
    const userId = JSON.parse(localStorage.getItem('user_data')); // recuperamos el id del usuario
    // verificamos si ya tiene su informacio 


    this.inPromise = true;  // 
    this.perfilClienteService._getPerfilCliente(userId.id).subscribe(
      (resp: any) => {
        // Como ya existe , vamos a editar
        if (resp) {
          console.log(resp);
          apellido = resp.perfil.apellido;
          nombre = resp.perfil.nombre;
          DNI = resp.perfil.documento_dni;
          this.setMoreDetail(metodoDePago, nombre, apellido, DNI);

        }
        this.inPromise = false;
      },
      error => {
        // Como no hay perfil, le decimos crear            
        console.error(error);
        this.inPromise = false;


      })
    console.log(apellido + " " + nombre + " " + DNI);






  }
  setMoreDetail(metodoDePago: number, nombre: string, apellido: string, DNI: string) {

    if (!apellido || !nombre || !DNI) {
      this.as.msg('INFO', 'PERFIL', 'Rellene su Perfil Antes de hacer un pedido');
      this.as.msg('ERR', 'ERROR', 'Perfil No Registrado!');

      $('#carrito').modal('hide');
      this.section = 'shipping';
      $('#perfilClienteModalGestion').modal('toggle');

      return
    }
    // datos segun el metodo de entrega
    const domicilio = this.section == 'inMarketForm' ? null : this.section == 'delivery' ? this.orderForm.value.domicilioEntrega : this.interiorForm.value.domicilioEntrega
    const personasAutorizada = this.section == 'delivery' ? this.orderForm.value.authorizedPerson : this.interiorForm.value.authorizedPerson;
    const personasAutorizadaDni = this.section == 'delivery' ? this.orderForm.value.authorizedPersonDni : this.interiorForm.value.authorizedPersonDni;
    const personasAutorizadaPasaporte = this.section == 'delivery' ? this.orderForm.value.authorizedPersonPasaporte : this.interiorForm.value.authorizedPersonPasaporte;
    const codigoPostal = this.section == 'internalDelivery' ? this.interiorForm.value.codigoPostal : null;
    const localidad = this.section == 'delivery' ? this.orderForm.value.localidad : this.section == 'internalDelivery' ? this.interiorForm.value.localidad : null;
    const disponibilidad = this.section == 'delivery' ? this.orderForm.value.disponibilidad : null;
    const fecha = this.section == 'delivery' ? this.orderForm.value.fecha : this.section == 'inMarketForm' ? this.inMarketForm.value.fechaRetiro : 'NO APLICA';
    const provincia = this.section == 'internalDelivery' ? this.interiorForm.value.provincia : null
    const telefono = this.section == 'internalDelivery' ? this.interiorForm.value.telefono : null
    const celular = this.section == 'internalDelivery' ? this.interiorForm.value.celular : null
    const direccion = this.section == 'internalDelivery' ? this.interiorForm.value.direccion : null

    this.metodoDePago = metodoDePago == 1 ? 'Efectivo' :
      metodoDePago == 2 ? 'Depósito' :
        metodoDePago == 3 ? 'Transferencia' :
          metodoDePago == 4 ? 'MercadoPago' : 'Tarjeta';

    // datos detalles de compra
    this.detailOrder = {
      metodoEntrega: this.section,
      metodoDePago: this.metodoDePago,
      productos: this.carritoService.getAll(),
      total: this.carritoService.getTotal(),
      domicilio: domicilio,
      persona_authorizada: personasAutorizada,
      codigo_postal: codigoPostal,
      localidad: localidad,
      fecha: fecha,
      disponibilidad: disponibilidad,
      personasAutorizadaDni: personasAutorizadaDni,
      personasAutorizadaPasaport: personasAutorizadaPasaporte,
      numeroPedido: null,
      pedidoRealizado: false,
      provincia: provincia,
      telefono: telefono,
      celular: celular,
      recomprar: false,
      direccion: direccion

    }
    this.carritoService.setDetailOrder(this.detailOrder);

  }
  // para recomprar el producto del  pedido(desde recomprar-> detalles) 
  recomprar(item) {
    console.log(item);
    this.carritoService.addItem(item.id, item.producto, item.marca, item.cantidad, item.precio);

    this.as.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${item.producto}' al carrito de compras`); item.cantidad = 1;
  }

}
