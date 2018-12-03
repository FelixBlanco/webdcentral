import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private as: AlertsService
  ) { }

  ngOnInit() {
    this.newForm = this.fb.group({
      titulo: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      idBlogCategoria:['', Validators.required],
      titulo: ['', Validators.required]
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

  save(){
    const values = this.newForm.value;

    this.inPromise = true;

    this.blogService.persistCategory(values).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.inPromise = false;
        this.newForm.reset();
        $('#nuevo').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha almacenado el registro');
        this.getAll();
      }else{
        console.error(resp);
        this.inPromise = false;
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.getAll();
    }, error => {
      console.log(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

  update(){
    const values = this.updateForm.value;

    this.inPromise = true;
    this.blogService.updateCategory(values, values.idBlogCategoria).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        $('#modificar').modal('hide');
        this.as.msg('OK', 'Éxito', 'El registro ha sido actualizado');
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
      if(resp.ok){
        $('#eliminar').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha eliminado el cupón');
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
      }
      this.getAll();
      this.inPromise = false;

    }, error => {
      console.error(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }


}
