import { UsersService } from './../users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from './../posts/posts.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm = new FormGroup({
    n: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    e: new FormControl('',
      [Validators.required, Validators.email]),
  })
  users:any;
  etat=1;
  post={
    title:"",
    body:"",
    postedAt:"",
    userId:"",
  };

  constructor(private postsService: PostsService,private usersService:UsersService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUsers();
    this.route.params.subscribe(params => {
      if(params['edit']){
          this.etat=0;
          this.postsService.getPost(params['postId']).subscribe(
            post=>{
              
              this.post=post;
            }
          )
      }
    });
  }

  loadUsers(){
    this.usersService.getUsers().subscribe(users=>{
      this.users=users;
    })
  }

  savePost(){
    if (this.etat==1) {
      this.addPost();
    }else
      this.updatePost();
  }

  addPost(){
    return this.postsService.addPost(this.post)
        .subscribe(res => {
          this.router.navigate(['/posts']);
        }, (err) => {
          console.log(err);
          
        });
  }

  updatePost(){
    return this.postsService.updatePost(this.post)
        .subscribe(res => {
          this.router.navigate(['/posts']);
        }, (err) => {
          console.log(err);
          
        });
  }

}
