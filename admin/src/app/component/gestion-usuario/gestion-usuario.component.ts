import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { AlertsService } from '../../services/alerts.service';

declare var $;

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {

  listUsers:any;

  newForm:any = { name: null, userNane: null, email: null, fk_idPerfil: 2 }

  editForm:any = { id:null, name: null, userNane: null, email: null, password: null }

  constructor(
    private UsuariosService:UsuariosService,
    private alertService:AlertsService,
    ) { }

  ngOnInit() {
    this.listaUser();
  }

  listaUser(){
    this.UsuariosService.listaUsuarios().subscribe(
      (resp:any) =>{
        this.listUsers = resp.users
      }
    )
  }

  addUser(){
    if(this.newForm.password.length <= 8){
      this.alertService.msg("ERR", "Error", 'la contraseña debe ser mayor de 8 caracteres');
    }else{
      this.UsuariosService._addUser(this.newForm).subscribe(
        resp => {
          $("#newUserModal").modal('hide');
          this.newForm= { name: null, userNane: null, email: null }
          // this.alertService.Success('Usuario creado satifactoriamente');
          this.alertService.msg("OK","Éxito", "Se ha guardado el registro");
          this.listaUser();
        },
        error => {
          // this.alertService.listError(error.error);
          this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
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
        // this.alertService.listError(error.error);
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  deleteUser(id:number){
    this.UsuariosService.deleteUser(id).subscribe(
      resp => {
        this.listaUser();
        this.alertService.msg("OK","Éxito", "Se ha elimino correctamente");
      },
      error => {
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }
}
