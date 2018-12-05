import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { AlertsService } from 'src/app/services/alerts.service';

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

  image = 'https://http2.mlstatic.com/montable-electrico-mercedes-benz-injusa-6v-auto-carro-nino-D_NQ_NP_839208-MLM26835805673_022018-F.webp';

  constructor(
    private blogService: BlogService,
    private as: AlertsService
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  routeTo(what, cat?){
    if(what === 'blogs'){
      this.inPromise = true;
      this.getAllBlogsBy(cat.idBlogCategoria).then((list) =>{
        this.inPromise = false;
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

    const resp  = await this.blogService.getAll().toPromise();
    if(resp.ok && resp.status === 200){
      return resp.body.blogs;
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
    this.blogService.getOne(1).subscribe(
      (resp) => {
        if(resp.ok && resp.status === 200){
          setTimeout(() => {
            this.actualBlog = resp.body.blogs;
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
