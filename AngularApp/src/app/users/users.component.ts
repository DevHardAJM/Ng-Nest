import { Component, OnInit } from '@angular/core';
import {UsersService} from "./users.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  constructor(private usersService: UsersService,private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  showUserDetails(userId){
    this.router.navigate(['/users',userId]);
  }

  showUpdateUserForm(userId){
    this.router.navigate(['/users/edit/'+userId,{edit:true,id:userId}]);
  }

  showCreateUserForm(){
    this.router.navigate(['/users/create']);
  }

  delteUser(userId){
    this.usersService.removeUser(userId)
      .subscribe(users => {
        this.getUsers();
      });
  }

}
