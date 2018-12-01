import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { BlogService } from 'src/app/services/blog.service';

declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  @ViewChild('table') table: any;
  @ViewChild('image') image: ElementRef;

  limit: number = 5;
  columns: any = [
    { prop: 'titulo' },
    { prop: 'descripcion'},
    { prop: 'fk_idCategoria'},
    { prop: 'set_imagen' },
  ];

  rows: any;
  blogList: any[] = [];
  categoriaList: any[] = [];

  newForm: FormGroup;
  updateForm: FormGroup;

  inPromise: boolean;

  imgLoaded: File;

  constructor(
    private fb: FormBuilder,
    private as: AlertsService,
    private blogService: BlogService
  ) { 
    this.newForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fk_idCategoria: ['', Validators.required],
      imagen: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      id: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fk_idCategoria: ['', Validators.required],
      imagen: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.updateLists();
  }

  set(row){
    this.updateForm.patchValue({
      id: row.idBlog,
      titulo: row.titulo,
      descripcion: row.descripcion,
      fk_idCategoria: row.fk_idCategoria,
      imagen: row.foto//TODO
    })
  }

  getCategoriaName(row): string{
    const cat = this.categoriaList.filter((val) => val.idBlogCategoria === row.fk_idCategoria)[0]
    if(cat)
      return cat.titulo;
  }

  showImage(row){
    this.updateForm.patchValue({
      titulo: row.titulo,
      imagen: row.set_imagen
    });
    $('#imagen').modal('toggle');
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const fileTo: File = event.target.files[0];

      if(!fileTo.type.includes('image/png') 
        && !fileTo.type.includes('image/jpg') 
        && !fileTo.type.includes('image/jpeg') ){
          this.as.msg('ERR','Error:', 'El archivo no es admitido o no es una imagen');
          this.newForm.patchValue({
            imagen: null
          });
          return;
      }

      if(fileTo.size > 5000000){
        this.as.msg('ERR','Error:', 'El archivo es muy pesado');
          this.newForm.patchValue({
            imagen: null
          });
          return;
      }

      this.imgLoaded = fileTo;
      this.newForm.patchValue({
        imagen: fileTo
      });
    }
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.blogList.filter(function(d) {
      return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val) ||
      (d.descripcion.toLowerCase().indexOf(val) !== -1 || !val) 
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  updateLists(){
    this.getAllCategories().then(() => {
      this.getAll();
    });
  }

  async getAllCategories(){
    const resp = await this.blogService.getAllCategories().toPromise();
    if(resp.ok && resp.status === 200){
      this.categoriaList = resp.body.cat;
    }else{
      console.error(resp);
      this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
    }
  }

  getAll(){
    this.blogService.getAll().subscribe((resp)=>{
      if(resp.ok && resp.status === 200){
        this.blogList = resp.body.blogs;
        this.rows = [...this.blogList];
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
      }
    }, error => {
      console.error(error);
      this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
    });
  }

  save(){
    const value = this.newForm.value;

    let toSend = new FormData();

    toSend.set('titulo', value.titulo);
    toSend.set('descripcion', value.descripcion);
    toSend.set('fk_idCategoria', value.fk_idCategoria);

    if(this.imgLoaded){
      toSend.set('foto', this.imgLoaded);
    }
    
    this.inPromise = true;
    this.blogService.persist(toSend).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.newForm.reset();
        this.image.nativeElement.value = "";
        $('#nuevo').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha almacenado el registro');        
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.inPromise = false;
      this.updateLists();
    }, error => {
      console.log(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

  update(){
    const value = this.updateForm.value;

    let toSend = new FormData();

    toSend.set('titulo', value.titulo);
    toSend.set('foto', this.imgLoaded);
    toSend.set('descripcion', value.descripcion);
    toSend.set('fk_idCategoria', value.fk_idCategoria);

    this.inPromise = true;
    this.blogService.update(toSend, value.id).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.image.nativeElement.value = "";
        $('#modificar').modal('hide');
        this.as.msg('OK', 'Éxito', 'El registro ha sido actualizado');
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.inPromise = false;
      this.updateLists();
    }, error => {
      console.error(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

  delete(){
    const values = this.updateForm.value;

    this.inPromise = true;

    this.blogService.delete(values.id).subscribe((resp) => {
      if(resp.ok){
        $('#eliminar').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha eliminado el cupón');
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
      }
      this.inPromise = false;
      this.updateLists();
    }, error => {
      console.error(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

}
