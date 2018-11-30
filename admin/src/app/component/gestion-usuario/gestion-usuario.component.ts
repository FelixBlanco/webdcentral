import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('image') image: ElementRef;
  @ViewChild('image') imageEdit: ElementRef;

  actualUser: string = localStorage.getItem('userName');


  listUsers:any; list_rol:any;

  newUser : FormGroup;
  editUser: FormGroup;

  imgLoaded: File;
  inPromise: boolean;

  imageUrl: string;

  constructor(
    private UsuariosService:UsuariosService,
    private alertService:AlertsService,
    private rolPerfilService: RolPerfilService,
    private fb: FormBuilder
    ) { 
      this.newUser = this.fb.group({
        name : ['',Validators.required],
        email : ['',[Validators.required, Validators.pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]],
        userName : ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern(new RegExp(/(^[a-zA-Z0-9._-]*$)/))]],
        fk_idPerfil : ['',Validators.required],
        password : ['',Validators.required],
        password_confirmation : ['', Validators.required],
      });

      this.editUser = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]],
        userName: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(32), Validators.pattern(new RegExp(/(^[a-zA-Z0-9._-]*$)/))]],
        fk_idPerfil:['', Validators.required]
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
    const values = this.newUser.value;

    if(values.password.length <= 8){
      this.alertService.msg("ERR", "Error", 'la contraseña debe ser mayor de 8 caracteres');
      return;
    }

    let user = new FormData();

    user.append("name",values.name);
    user.append("email",values.email);
    user.append("password",values.password);
    user.append("userName",values.userName);
    user.append("fk_idPerfil",values.fk_idPerfil);
    user.append("fotoPerfil",this.imgLoaded, new Date().toString());
    user.append("password_confirmation",values.password_confirmation);

    this.inPromise = true;
    this.UsuariosService._addUser(user).subscribe(
      resp => {
        this.inPromise = false;
        $("#newUserModal").modal('hide');
        this.alertService.msg("OK","Éxito", "Se ha guardado el registro");
        this.listaUser();
        this.newUser.reset();
        this.image.nativeElement.value = "";
      },
      error => {
      
        this.inPromise = false;
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

  set(user){
    this.editUser.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      fk_idPerfil: user.fk_idPerfil,
    });
    console.log('user',user, 'form', this.editUser.value, 'form invalid?', this.editUser.invalid);
  }


  upgradeUser(){
    const values = this.editUser.value;

    let user: FormData =  new FormData();

    user.append("name",values.name);
    user.append("email",values.email);
    user.append("userName",values.userName);
    user.append("fk_idPerfil",values.fk_idPerfil);
    user.append("fotoPerfil",this.imgLoaded, new Date().toString());

    this.inPromise = true;
    this.UsuariosService.upgradeUsers(user,values.id).subscribe(
      resp => {
        $("#updateModal").modal('hide');
        this.alertService.msg("OK","Éxito", "Se ha actualizo el registro");
        this.listaUser();
        this.imageEdit.nativeElement.value = "";
        this.inPromise = false;

      },
      error => {
        this.inPromise = false;
        
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

  showImage(user){
    this.imageUrl = user.ruta_imagen;
    $('#imagen').modal('toggle');
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const fileTo: File = event.target.files[0];

      if(!fileTo.type.includes('image/png') 
        && !fileTo.type.includes('image/jpg') 
        && !fileTo.type.includes('image/jpeg') ){
          this.alertService.msg('ERR','Error:', 'El archivo no es admitido o no es una imagen');
          this.newUser.patchValue({
            imagen: null
          });
          return;
      }

      if(fileTo.size > 5000000){
        this.alertService.msg('ERR','Error:', 'El archivo es muy pesado');
          this.newUser.patchValue({
            imagen: null
          });
          return;
      }

      this.imgLoaded = fileTo;
      this.newUser.patchValue({
        imagen: fileTo
      });
    }
  }

  deleteUser(){
    const values = this.editUser.value;

    this.UsuariosService.deleteUser(values.id).subscribe(
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
