import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PerfilClienteService } from '../../services/perfil-cliente.service';
import { AlertsService } from '../../services/alerts.service'

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
    telefono: null, celular_code: null, celular: null, domicilioEntrega : null
  };
  
  isNuevo:any; 

  constructor(
    private perfilService: PerfilClienteService,
    private as: AlertsService,
    private fb: FormBuilder, 
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
      domicilioEntrega : ['', Validators.required],
    })

  }

  ngOnInit() {
    this.isNuevo = true; // Cuando llamemos la informacion, consultamos si existe en perfil-cliente
  }

  crear(){    
    
    const data:any = { 
      nombreComercio: this.form.nombreComercio, nombre:  this.form.nombre, apellido:  this.form.apellido,
      documento_dni: this.form.documento_dni, documento_otro: this.form.documento_otro, correo:  this.form.correo, 
      telefono:  this.form.telefono_code +''+ this.form.telefono, celular:  this.form.celular_code +''+ this.form.celular, 
      domicilioEntrega :  this.form.domicilioEntrega
    } 

    this.perfilService._crear(data).subscribe(
      resp =>{
        console.log(resp)
        this.as.msg('OK','Registro exitoso')
      },
      error => {
        this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  update(){
    this.perfilService._update(this.form, this.form.idPerfilCliente).subscribe(
      resp => {
        console.log(resp)
        this.as.msg('OK','Actualizacion completada')
      },
      error => {
        this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }
}
