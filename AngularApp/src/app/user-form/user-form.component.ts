import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm = new FormGroup({
    n: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    e: new FormControl('',
      [Validators.required, Validators.email]),
  })
  etat=1;
  user={
    name:"",
    email:""
  };

  constructor(private usersService: UsersService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['edit']){
          this.etat=0;
          this.usersService.getUser(params['userId']).subscribe(
            user=>{
              this.user=user;
            }
          )
      }
    });
  }

  saveUser(){
    if (this.etat==1) {
      this.addUser();
    }else
    this.updateUser();
  }

  addUser(){
    return this.usersService.addUser(this.user)
        .subscribe(res => {
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
          
        });
  }

  updateUser(){
    return this.usersService.updateUser(this.user)
        .subscribe(res => {
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
          
        });
  }

}
