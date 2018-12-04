import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

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


  getAllCategories(){
    this.blogService.getAllCategories().subscribe(
      (resp) => {
        console.log(resp);
        if(resp.ok){
          this.categoriesList = resp.body.cat;
        }
      },error => {

      });
  }

}
