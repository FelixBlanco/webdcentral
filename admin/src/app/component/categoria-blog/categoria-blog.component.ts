import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { AlertsService } from 'src/app/services/alerts.service';

declare var $: any;

@Component({
  selector: 'app-categoria-blog',
  templateUrl: './categoria-blog.component.html',
  styleUrls: ['./categoria-blog.component.css']
})
export class CategoriaBlogComponent implements OnInit {

  @ViewChild('table') table: any;
  @ViewChild('image') imagen: ElementRef;

  limit: number = 5;

  categoriaList: any[] = [];

  columns: any = [
    { prop: 'idBlogCategoria' },
    { prop: 'titulo' }
  ];
  rows: any;

  newForm: FormGroup;
  updateForm: FormGroup;

  inPromise: boolean;

  imgLoaded: File;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private as: AlertsService
  ) { }

  ngOnInit() {
    this.newForm = this.fb.group({
      titulo: ['', Validators.required],
      imagen: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      idBlogCategoria:['', Validators.required],
      titulo: ['', Validators.required],
      imagen: ['']
    });

    this.getAll();
  }

  getAll(){
    this.blogService.getAllCategories().subscribe((resp)=>{
      if(resp.ok && resp.status === 200){
        this.categoriaList = resp.body.cat;
        this.rows = [...this.categoriaList];
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
      }
    }, error => {
      console.error(error);
      this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
    })
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.categoriaList.filter(function(d) {
      return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val) 
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  set(row:any){
    this.updateForm.patchValue({
      idBlogCategoria: row.idBlogCategoria,
      titulo: row.titulo
    });
  }

  showImage(row){
    this.updateForm.patchValue({
      titulo: row.titulo,
      imagen: row.set_imagen
    });
    $('#imagen').modal('toggle');
  }

  onFileChange(event) {//Fix
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

  save(){
    const values = this.newForm.value;

    this.inPromise = true;

    let toSend = new FormData();
    toSend.append("titulo", values.titulo);
    toSend.append("imagen", this.imgLoaded);

    this.blogService.persistCategory(toSend).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.newForm.reset();
        $('#nuevo').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha almacenado el registro');
        this.imgLoaded = null;
        this.imagen.nativeElement.value = ''
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.inPromise = false;
      this.getAll();
    }, error => {
      console.log(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

  update(){
    const values = this.updateForm.value;

    let toSend = new FormData();
    toSend.append("titulo", values.titulo);
    toSend.append("imagen", this.imgLoaded);

    this.inPromise = true;
    this.blogService.updateCategory(toSend, values.idBlogCategoria).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        $('#modificar').modal('hide');
        this.as.msg('OK', 'Éxito', 'El registro ha sido actualizado');
        this.imgLoaded = null;
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.inPromise = false;
      this.getAll();
    }, error => {
      console.error(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });

  }

  delete(){
    const values = this.updateForm.value;

    this.inPromise = true;
    this.blogService.deleteCategory(values.idBlogCategoria).subscribe((resp) => {
      if(resp.ok && resp.status === 200){
        $('#eliminar').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha eliminado la categoría');
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
      }
      this.getAll();
      this.inPromise = false;

    }, error => {
      if(error.status === 409){
        this.as.msg('INFO', 'Info', 'No se puede eliminar la categoría por que ya está en uso');
      }else{
        console.error(error);
        this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
      }
      this.inPromise = false;
      
    });
  }


}
