import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  section: 'home' | 'questions' | 'howto' | 'contact';
  constructor() {
  }

  ngOnInit() {
    this.section = 'home';
  }

  routeTo(section : 'home' | 'questions' | 'howto' | 'contact'){
    this.section = section;
  }
  
}
