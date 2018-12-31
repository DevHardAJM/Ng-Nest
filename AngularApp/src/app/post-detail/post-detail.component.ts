import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post={
    id:"",
    title:"",
    body:"",
    postedAt:"",
    userId:"",
  };

  constructor(private postsService: PostsService,private usersService:UsersService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
            this.getPost(params['postId']);
    });
  }

  getPost(postId){
    this.postsService.getPost(postId).subscribe(
      post=> {this.post=post;}
    );
  }

  showUpdatePostForm(postId){
    this.router.navigate(['/posts/edit/'+postId,{edit:true,id:postId}]);
  }



  deltePost(postId){
    this.postsService.removePost(postId)
      .subscribe(posts => {
        this.router.navigate(['/posts']);
      });
  }


}
