import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PerfilClienteService } from '../../services/perfil-cliente.service';
import { AlertsService } from '../../services/alerts.service'
import { LoginService } from '../../services/login.service';
import { TipoFacturasService } from '../../services/tipo-facturas.service'

declare var $;

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  formData:FormGroup;
  formDataDomicilio:FormGroup;
  formDataFacturacion:FormGroup;

  form:any={ 
    idPerfilCliente: null, nombreComercio: null, nombre: null, apellido: null,
    documento_dni:null, documento_otro:null, correo: null, telefono_code: null, 
    telefono: null, celular_code: null, celular: null, fk_idPerfilCliente: null,
    
    domicilio_entrega:null, fk_idTipoFactura: null,CUIT: null, CUITrazonSocial: null,
    CUITDomicilioFidcal: null,

    domicilio_1:null,domicilio_2:null,domicilio_3:null,domicilio_4:null,domicilio_5:null,domicilio_6:null
  };
  
  isNuevo:any; 
  tiposFacturas:any;

  constructor(
    private perfilService: PerfilClienteService,
    private as: AlertsService,
    private fb: FormBuilder, 
    private user: LoginService,
    private tipoFacturasService: TipoFacturasService
  ) { 

    this.formData = this.fb.group({
      nombreComercio  : ['', Validators.required],
      nombre          : ['', Validators.required],
      apellido        : ['', Validators.required],
      documento_dni   : ['', Validators.required],
      documento_otro  : ['', Validators.required],
      correo          : ['', Validators.required],
      telefono_code   : [''],
      telefono        : ['', Validators.required],
      celular_code    : [''],
      celular         : ['', Validators.required],
    })


    this.formDataDomicilio = this.fb.group({
      domicilio_entrega  : ['', Validators.required],
      domicilio_entrega_2  : [''],
      domicilio_entrega_3  : [''],
      domicilio_entrega_4  : [''],
      domicilio_entrega_5  : [''],
      domicilio_entrega_6  : ['']
    })   
    
    this.formDataFacturacion = this.fb.group({
      CUIT                : ['', Validators.required],
      fk_idTipoFactura    : ['', Validators.required],      
      CUITrazonSocial         : ['', Validators.required],
      CUITDomicilioFidcal     : ['', Validators.required],
    });

    this.tipoFacturasService._getTipoFactura().subscribe(
      (resp:any) => {
        if(resp){
          this.tiposFacturas = resp.tipo_facturas
        }        
      }
    )

  }

  ngOnInit() {
    if(localStorage.getItem('token') != null){ // Verificamos si esta logueado
      this.isNuevo = true; // Cuando llamemos la informacion, consultamos si existe en perfil-cliente

      this.getPerfilCliente();
    }  
  }

  getPerfilCliente(){
    //Solicitamos la informacion del usuario 
    this.user._getAuthUser().subscribe(
      (resp:any) => { 

        this.form.fk_idPerfilCliente = resp.id // agregamos el ID
        
        const userId = JSON.parse( localStorage.getItem('user_data') ); // recuperamos el id del usuario
        // verificamos si ya tiene su informacio 
        this.perfilService._getPerfilCliente(userId.id).subscribe(
          (resp:any) => {
            // Como ya existe , vamos a editar
            if(resp){
              this.form = resp.perfil; 
              this.form.idPerfilCliente = resp.perfil.idPerfilCliente;
              this.isNuevo = false;
            }
          },
          error => {
            // Como no hay perfil, le decimos crear            
            this.isNuevo = true;            
          }
        )
        
      }
    )    
  }

  crear(){    
    const userId = JSON.parse( localStorage.getItem('user_data') ); // recuperamos el id del usuario
    const data:any = { 

      // DATOS PERSONALES
      nombreComercio: this.form.nombreComercio, 
      nombre        :  this.form.nombre, 
      apellido      :  this.form.apellido,
      documento_dni : this.form.documento_dni, 
      documento_otro: this.form.documento_otro, 
      correo        :  this.form.correo, 
      telefono      :  this.form.telefono_code +''+ this.form.telefono, 
      celular       :  this.form.celular_code +''+ this.form.celular,
      
      // DOMICILIO
      domicilio_entrega :  this.form.domicilio_entrega, 
      domicilio_1       :  this.form.domicilio_entrega, // vamos a ignorar este que es el mismo domicilio_entrega
      domicilio_2       :  this.form.domicilio_2,
      domicilio_3       :  this.form.domicilio_3,
      domicilio_4       :  this.form.domicilio_4,
      domicilio_5       :  this.form.domicilio_5,
      domicilio_6       :  this.form.domicilio_6,
      
      // FACTURA
      fk_idTipoFactura:  this.form.fk_idTipoFactura, 
      CUIT:  this.form.CUIT, 
      CUITrazonSocial:  this.form.CUITrazonSocial, 
      CUITDomicilioFidcal:  this.form.CUITDomicilioFidcal, 
      fk_idPerfilCliente: userId.id
    } 

    this.perfilService._crear(data).subscribe(
      (resp:any) =>{
        this.as.msg('OK',resp.msj)
        this.getPerfilCliente();
        $("#perfilClienteModal").modal('hide');
      },
      error => {
        this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  update(){
    const userId = JSON.parse( localStorage.getItem('user_data') ); // recuperamos el id del usuario
    this.perfilService._update(this.form, this.form.idPerfilCliente).subscribe(
      resp => {
        this.as.msg('OK','Actualizacion completada')
        this.getPerfilCliente();
        $("#perfilClienteModal").modal('hide');
      },
      error => {
        this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }
}
