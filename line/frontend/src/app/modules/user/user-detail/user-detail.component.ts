import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  providers:[UserService, RoleService]
})
export class UserDetailComponent implements OnInit {
  message: Message = new Message();
  user : User;
  roles: Role[];
  selectedRole: Role = new Role(); 

  constructor(private location: Location, private route: ActivatedRoute, private userService: UserService, private roleService: RoleService) { 
    this.user = new User();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.userService.get(params["id"]).then(user =>{ 
          this.user = user;
          this.selectedRole = this.user.roles[0];
        });
      }
    });

    this.roleService
      .getAll()
      .then(roles => this.roles = roles)
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

  save(user: User, selectedRole: Role): void {
    user.roles = [selectedRole];

    this.userService
        .save(user)
        .then(user => {
          this.message.success("");

          Commons.delay().then(() => {
            this.location.back();
          });
        })
        .catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }


}
