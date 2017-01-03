import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user';
import { UserService } from './user.service';

import { MESSAGE_TYPE } from '../../message/message.constant';

@Component({
  moduleId: "user",
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers : [UserService]
})
export class UserComponent implements OnInit {
  user : User;
  messageType : Number = 0;
  message : String = "";

  constructor(private route: ActivatedRoute, private userService: UserService) { 
    this.user = new User();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.userService.getUser(params["id"]).then(user =>{ 
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

          this.messageType = MESSAGE_TYPE.Success;
          this.message = "save-success";
          
          //this.goBack();
        }).catch(error => {
          this.messageType = MESSAGE_TYPE.Error;
          this.message = error;
        })
  }

  goBack(): void {
    window.history.back();
  }

}
