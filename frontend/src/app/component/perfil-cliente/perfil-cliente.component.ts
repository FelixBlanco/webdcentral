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

  form:any={ 
    idPerfilCliente: null, nombreComercio: null, nombre: null, apellido: null,
    documento_dni:null, documento_otro:null, correo: null, telefono_code: null, 
    telefono: null, celular_code: null, celular: null, fk_idPerfilCliente: null,
    
    domicilio_entrega:null, fk_idTipoFactura: null,CUIT: null, CUITrazonSocial: null,
    CUITDomicilioFidcal: null
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
      telefono_code   : ['', Validators.required],
      telefono        : ['', Validators.required],
      celular_code    : ['', Validators.required],
      celular         : ['', Validators.required],
      domicilio_entrega  : ['', Validators.required],
      fk_idTipoFactura   : ['', Validators.required],
      CUIT         : ['', Validators.required],
      CUITrazonSocial         : ['', Validators.required],
      CUITDomicilioFidcal     : ['', Validators.required],
    })

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
      nombreComercio: this.form.nombreComercio, 
      nombre:  this.form.nombre, 
      apellido:  this.form.apellido,
      documento_dni: this.form.documento_dni, 
      documento_otro: this.form.documento_otro, 
      correo:  this.form.correo, 
      telefono:  this.form.telefono_code +''+ this.form.telefono, 
      celular:  this.form.celular_code +''+ this.form.celular,
      domicilio_entrega:  this.form.domicilio_entrega, 
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
