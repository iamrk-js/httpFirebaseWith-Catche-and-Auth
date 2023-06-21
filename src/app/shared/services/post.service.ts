import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, responsePost } from '../model/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string = environment.basePostsUrl;
  postUrl = `${this.baseUrl}/posts.json`;
  private dataSubject = new BehaviorSubject<Array<Ipost> | null>(null);
  private data$: Observable<any> = this.dataSubject.asObservable();
  private cachedData!: Array<Ipost>; // undefined
  constructor(private _http: HttpClient) { }

  getAllPosts(): Observable<Ipost[]> {
    if (this.cachedData) {
      return this.data$
    } else {
      return this._http.get<responsePost>(this.postUrl)
        .pipe(
          // tap(res => console.log(res)),
          map(res => {
            const postArray = []
            for (const key in res) {
              let obj = {
                ...res[key],
                id: key
              }
              postArray.push(obj)
            }
            return postArray
          }),
          tap(res => {
            this.cachedData = res;
            this.dataSubject.next(res)
          })
        )
    }

  }

  getSinglePost(id: string): Observable<Ipost> {
    let postUrl = `${this.baseUrl}/posts/${id}.json`;
    return this._http.get<Ipost>(postUrl)
  }

  updatePost(post: Ipost): Observable<Ipost> {
    let updateUrl = `${this.baseUrl}/posts/${post.id}.json`
    return this._http.patch<Ipost>(updateUrl, post)
  }

  createPost(obj: Ipost): Observable<Ipost> {
    return this._http.post<Ipost>(this.postUrl, obj)
  }
  deletePost(id: string): Observable<any> {
    let deleteurl = `${this.baseUrl}/posts/${id}.json`
    return this._http.delete(deleteurl)
  }
}
