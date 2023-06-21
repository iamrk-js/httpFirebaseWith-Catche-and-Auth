import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {
  postForm !: FormGroup;
  isInEditMode: boolean = false;
  updateId !: string;
  constructor(private _auth: ActivatedRoute,
    private _postService: PostService,
    private _router : Router) { }

  ngOnInit(): void {
    this.createForm();
    this._auth.params
      .subscribe((params: Params) => {
        this.updateId = params['postId'];
        if (this.updateId) {
          this.isInEditMode = true;
          this._postService.getSinglePost(this.updateId)
            .subscribe(res => {
              console.log(res)
              this.postForm.patchValue(res)
            })
        }
      });
      this._postService.getAllPosts()
        .subscribe(res => {
          console.log(res)
        })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    })
  }

  onPostSubmit() {
    if(this.postForm.valid){
      let obj = this.postForm.value;
      this._postService.createPost(obj)
        .subscribe(res => {
          console.log(res);
          this._router.navigate(['/'])
        })

    }
  }

  onPostUpdate(){
    if(this.postForm.valid){
      let obj = {...this.postForm.value, id : this.updateId};
      console.log(obj)
      this._postService.updatePost(obj)
        .subscribe(res => {
          console.log(res)
          this._router.navigate(['/'])
        })
    }
  }
}
