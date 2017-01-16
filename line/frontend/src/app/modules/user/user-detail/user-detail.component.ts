import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  providers:[UserService]
})
export class UserDetailComponent implements OnInit {
  message: Message = new Message();
  user : User;

  constructor(private route: ActivatedRoute, private userService: UserService) { 
    this.user = new User();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.userService.get(params["id"]).then(user =>{ 
          this.user = user;
        });
      }
    });
  }

  save(): void {
    this.userService
        .save(this.user)
        .then(user => {
          this.user = user; 
          
          this.message.success("");
        })
        .catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

  goBack(): void {
    window.history.back();
  }

}
