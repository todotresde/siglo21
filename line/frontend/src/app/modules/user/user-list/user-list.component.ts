import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[UserService]
})
export class UserListComponent implements OnInit {
  users: User[];
  messageType: number = 0;
  message: string = "";

  constructor(private router: Router, private userService: UserService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.userService.getUsers()
      .then(users => this.users = users)
      .catch(error => { this.messageType = 4;});
  }

  create(): void {
    this.router.navigate(['../user'],{ relativeTo: this.r });
  }

  edit(user: User): void {
    this.router.navigate(['../user', user.id],{ relativeTo: this.r });
  }

  remove(user: User): void {
    this.userService
      .removeUser(user)
      .then(user => this.users = this.users.filter(u => u.id !== user.id))
      .catch(error => { this.messageType = 4; this.message = error.message;});
  }

}
