import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  moduleId: "userId",
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService]
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private router: Router, private userService: UserService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.userService.getUsers().then(users => this.users = users);
  }

  create(): void {
    this.router.navigate(['../user']);
  }

  edit(user: User): void {
    this.router.navigate(['../user', user.id],{ relativeTo: this.r });
  }

  remove(user: User): void {
    this.userService.removeUser(user).then(user => this.users = this.users.filter(u => u.id !== user.id));
  }

}
