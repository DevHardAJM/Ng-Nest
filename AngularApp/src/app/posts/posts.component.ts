import { Component, OnInit } from '@angular/core';
import {PostsService} from "./posts.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts :any;
  constructor(private postsService: PostsService,private router: Router) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe(p => this.posts = p.map(
        e=>{
          (e.body.lenght>200)?e.body=e.body.substr(0,290)+'...':e.body=e.body;
          return e;
        }
      ));
  }

  showPostDetails(postId){
    this.router.navigate(['/posts',postId]);
  }

  showCreatePostForm(){
    this.router.navigate(['/posts/create']);
  }


}
