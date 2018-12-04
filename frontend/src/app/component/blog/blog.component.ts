import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  section: string;

  categoriesList: any[] = [];
  blogsList: any[] = [];

  image = 'https://http2.mlstatic.com/montable-electrico-mercedes-benz-injusa-6v-auto-carro-nino-D_NQ_NP_839208-MLM26835805673_022018-F.webp';

  constructor(
    private blogService: BlogService,
    private as: AlertsService
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  routeTo(what, id){
    console.log('what', what, 'id', id);
    this.getAllBlogsBy(id).then((list) =>{
      console.log(list);
      this.blogsList = list;
      this.section = what;
    });
  }


  getAllCategories(){
    this.blogService.getAllCategories().subscribe(
      (resp) => {
        if(resp.ok && resp.status === 200){
          this.categoriesList = resp.body.cat;
        }else{
          console.error(resp);
        }
      },error => {
        //TODO err
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

}
