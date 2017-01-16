import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers:[UserService]
})
export class UserListComponent implements OnInit {
  message: Message = new Message();
  users: User[];

  constructor(private router: Router, private userService: UserService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.userService.getAll()
      .then(users => { this.users = users;})
      .catch(error => { 
        this.message.error(JSON.parse(error._body).message);
      });
  }

  create(): void {
    this.router.navigate(['../user'],{ relativeTo: this.r });
  }

  edit(user: User): void {
    this.router.navigate(['../user', user.id],{ relativeTo: this.r });
  }

  remove(user: User): void {
    this.userService
      .remove(user)
      .then(user => {
         this.users = this.users.filter(u => u.id !== user.id);
         this.message.success();
      })
      .catch(error => {
          this.message.error(JSON.parse(error._body).message);
      })
      

    
  }

}
