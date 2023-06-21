import { Component, OnInit } from '@angular/core';
import { PostService } from './shared/services/post.service';
import { Ipost } from './shared/model/posts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpFirebase';

  constructor(){

  }
  ngOnInit(): void {
   
  }
}
