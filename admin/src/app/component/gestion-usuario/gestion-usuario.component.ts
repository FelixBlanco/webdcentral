import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { AlertsService } from '../../services/alerts.service';
import { RolPerfilService } from '../../services/rol-perfil.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

declare var $;

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {

  listUsers:any; list_rol:any;

  newForm:any = { name: null, userNane: null, email: null, fk_idPerfil: null, password_confirmation:null  }

  editForm:any = { id:null, name: null, userNane: null, email: null, password: null, fk_idPerfil:null }

  userDelete:any; 

  newUser : FormGroup;

  constructor(
    private UsuariosService:UsuariosService,
    private alertService:AlertsService,
    private rolPerfilService: RolPerfilService,
    private fb: FormBuilder
    ) { 
      this.newUser = this.fb.group({
        'nombre' : ['',Validators.required],
        'userName' : ['',Validators.required],
        'email' : ['',Validators.required],
        'tipo_perfil' : ['',Validators.required],
        'password' : ['',Validators.required],
        'password_confirmation' : ['', Validators.required]
      })
    }

  ngOnInit() {
    this.listaUser();
    this.getRolPerfil();
  }

  listaUser(){
    this.UsuariosService.listaUsuarios().subscribe(
      (resp:any) =>{
        this.listUsers = resp.users
      }
    )
  }

  getRolPerfil(){
    return this.rolPerfilService.getPerfil().subscribe(
      resp => {
        this.list_rol = resp;
      }
    )
  }

  addUser(){
    // newForm:any = { name: null, userNane: null, email: null, fk_idPerfil: null,  }
    
    if(this.newForm.password.length <= 8){
      this.alertService.msg("ERR", "Error", 'la contraseña debe ser mayor de 8 caracteres');
    }else{
      this.UsuariosService._addUser(this.newForm).subscribe(
        resp => {
          $("#newUserModal").modal('hide');
          this.newForm= { name: null, userNane: null, email: null, password_confirmation:null, password:null }
          // this.alertService.Success('Usuario creado satifactoriamente');
          this.alertService.msg("OK","Éxito", "Se ha guardado el registro");
          this.listaUser();
        },
        error => {
        
          if(error.error.errors.name != null){
            this.alertService.msg("ERR", error.error.errors.email);
          }

          if(error.error.errors.email != null){
            this.alertService.msg("ERR", error.error.errors.email);
          }

          if(error.error.errors.password != null){
            this.alertService.msg("ERR", error.error.errors.password);
          }
          
          if(error.error.errors.password_confirmation != null){
            this.alertService.msg("ERR", error.error.errors.password_confirmation);
          }
          
          if(error.error.errors.password_confirmation != null){
            this.alertService.msg("ERR", error.error.errors.password_confirmation);
          }
          
        }
      )
    }
  }

  editUser(infoUser){
    $("#exampleModal").modal('show');
    this.editForm = infoUser;
  }

  upgradeUser(){
    this.UsuariosService.upgradeUsers(this.editForm).subscribe(
      resp => {
        this.editForm = { id:null, name: null, userNane: null, email: null, password: null }
        $("#exampleModal").modal('hide');
        // this.alertService.Success('Usuario editados exitosamente');
        this.alertService.msg("OK","Éxito", "Se ha actualizo el registro");
        this.listaUser();
      },
      error => {
        
        if(error.error.errors.name != null){
          this.alertService.msg("ERR", error.error.errors.email);
        }

        if(error.error.errors.email != null){
          this.alertService.msg("ERR", error.error.errors.email);
        }

        if(error.error.errors.password != null){
          this.alertService.msg("ERR", error.error.errors.password);
        }
        
        if(error.error.errors.password_confirmation != null){
          this.alertService.msg("ERR", error.error.errors.password_confirmation);
        }
        
        if(error.error.errors.password_confirmation != null){
          this.alertService.msg("ERR", error.error.errors.password_confirmation);
        }

      }
    )
  }

  preguntarDelete(id){
    $("#deleteUserModal").modal('show');
    this.userDelete = id;
  }

  deleteUser(id:number = this.userDelete){
    this.UsuariosService.deleteUser(id).subscribe(
      resp => {
        $("#deleteUserModal").modal('hide');
        this.listaUser();
        this.alertService.msg("OK","Éxito", "Se ha elimino correctamente");
      },
      error => {
        this.alertService.msg("ERR", "Error", 'Algo salio mal');
      }
    )
  }
}
