import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ConfigColorService } from '../../services/config-color.service';

declare var $:any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  section: string;
  catSelected: string;

  categoriesList: any[] = [];
  blogsList: any[] = [];

  actualBlog: any;

  inPromise: boolean;
  inBatch: number;
  colorUno: any;

  constructor(
    private blogService: BlogService,
    private as: AlertsService,
    private configColor: ConfigColorService
  ) { 
    
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorUno = resp.colorOscuro
      }
    )  

  }

  ngOnInit() {
    setTimeout(()=> document.getElementById('scrollCategory').scrollIntoView({behavior: 'smooth'}),1000);

    this.getAllCategories();
  }

  routeTo(what, cat?){
    if(what === 'blogs'){
      this.inPromise = true;
      this.getAllBlogsBy(cat.idBlogCategoria).then((list: any[]) =>{
        
        this.inPromise = false;
        if(!list.length){
          this.as.msg('INFO', 'Info', 'No existen blogs de esta categoría');
          return;
        }

        this.catSelected = cat.titulo;
        this.blogsList = list;
        this.section = what;
      });
      return;
    }

    this.section = what;
  }


  getAllCategories(){
    this.inPromise = true;
    this.blogService.getAllCategories().subscribe(
      (resp) => {
        if(resp.ok && resp.status === 200){
          this.categoriesList = resp.body.cat;
        }else{
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
          console.error(resp);
        }
        this.inPromise = false;
      },error => {
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        console.error(error);
        this.inPromise = false;
      }
    );
  }

  async getAllBlogsBy(categoryId){

    const resp  = await this.blogService.getAllByCategoryId(categoryId).toPromise();
    if(resp.ok && resp.status === 201){
      return resp.body.blgos;
    }else{
      console.error(resp);
      return [];
    }
  }

  getBlogById(id: number){

    if(this.inBatch){
      return;
    }

    this.inBatch = id;
    this.blogService.getOne(id).subscribe(
      (resp) => {        
        if(resp.ok && resp.status === 200){
          setTimeout(() => {
            this.actualBlog = resp.body;
            $('#modalBlog').modal('show');
            this.inBatch = null;
          },1000)
        }else{
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
          console.error(resp);
        }
      }
    )
    
  }

}
