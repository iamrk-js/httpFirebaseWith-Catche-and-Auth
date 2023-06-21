import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../model/posts';

@Component({
  selector: 'app-postdashboard',
  templateUrl: './postdashboard.component.html',
  styleUrls: ['./postdashboard.component.scss']
})
export class PostdashboardComponent implements OnInit {
  postsArray: Ipost[] = []
  constructor(private _postService: PostService) {

  }
  ngOnInit(): void {
    this._postService.getAllPosts()
      .subscribe(res => {
        console.log(res)
        this.postsArray = res;
      })
  }

  onDelete(id: string) {
    let confirmation = confirm("Are you sure, you want to delete this post?")
    console.log(confirmation)
    if (confirmation) {
      // make api call to delte this post
      this._postService.deletePost(id)
        .subscribe(res => {
          console.log(res)
         this.postsArray = this.postsArray.filter(post => post.id !== id)
        })
    }
  }

}
