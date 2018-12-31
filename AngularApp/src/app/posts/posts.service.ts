import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly BASE_URL = 'http://localhost:5000/posts';

  constructor(private http: HttpClient) { }
  getPosts(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  getPost(postId:number): Observable<any> {
    return this.http.get(this.BASE_URL+"/"+postId);
  }
  
  addPost(post){
    return this.http.post(this.BASE_URL,post);
  }

  removePost(postId): Observable<any> {
    return this.http.delete(this.BASE_URL+"/"+postId);
  }

  updatePost(post): Observable<any> {
    var data = {
      title: post.title,
      body: post.body,
      postedAt:post.postedAt,
      userId:post.userId
    };
    return this.http.put(this.BASE_URL+"/"+post.id,data);
  }
}
