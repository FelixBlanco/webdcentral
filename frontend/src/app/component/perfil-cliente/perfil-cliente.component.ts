import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PerfilClienteService } from '../../services/perfil-cliente.service';
import { AlertsService } from '../../services/alerts.service'
import { LoginService } from '../../services/login.service';

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
    telefono: null, celular_code: null, celular: null, fk_idPerfilCliente: null
  };
  
  isNuevo:any; 

  constructor(
    private perfilService: PerfilClienteService,
    private as: AlertsService,
    private fb: FormBuilder, 
    private user: LoginService
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
    })

  }

  ngOnInit() {
    if(localStorage.getItem('access_token') != null){ // Verificamos si esta logueado
      this.isNuevo = true; // Cuando llamemos la informacion, consultamos si existe en perfil-cliente

      this.getPerfilCliente();
    }  
  }

  getPerfilCliente(){
    //Solicitamos la informacion del usuario 
    this.user._getAuthUser().subscribe(
      (resp:any) => { 

        this.form.fk_idPerfilCliente = resp.id // agregamos el ID
        
        // verificamos si ya tiene su informacio 
        this.perfilService._getPerfilCliente(resp.id).subscribe(
          (resp:any) => {
            // Como ya existe , vamos a editar
            if(resp){
              this.form = resp.perfil; 
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
    
    const data:any = { 
      nombreComercio: this.form.nombreComercio, nombre:  this.form.nombre, apellido:  this.form.apellido,
      documento_dni: this.form.documento_dni, documento_otro: this.form.documento_otro, correo:  this.form.correo, 
      telefono:  this.form.telefono_code +''+ this.form.telefono, celular:  this.form.celular_code +''+ this.form.celular,
      fk_idPerfilCliente: this.form.fk_idPerfilCliente
    } 

    this.perfilService._crear(data).subscribe(
      resp =>{
        this.as.msg('OK','Registro exitoso')
        this.getPerfilCliente();
        $("#perfilClienteModal").modal('hide');
      },
      error => {
        this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  update(){
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
