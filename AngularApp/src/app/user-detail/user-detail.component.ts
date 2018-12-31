import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from "../users/users.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user:any;
  constructor(private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usersService.getUser(params['userId'])
      .subscribe(user => this.user = user);
   });
  }
}
