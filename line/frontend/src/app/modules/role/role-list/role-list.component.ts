import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Role } from '../role';
import { RoleService } from '../role.service';

import { Message } from 'app/shared';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  providers:[RoleService]
})
export class RoleListComponent implements OnInit {
  message: Message = new Message();
  roles: Role[];

  constructor(private router: Router, private roleService: RoleService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.roleService.getAll()
      .then(roles => { this.roles = roles;})
      .catch(error => { 
        this.message.error(JSON.parse(error._body).message);
      });
  }

  create(): void {
    this.router.navigate(['../role'],{ relativeTo: this.r });
  }

  edit(role: Role): void {
    this.router.navigate(['../role', role.id],{ relativeTo: this.r });
  }

  remove(role: Role): void {
    this.roleService
      .remove(role)
      .then(role => {
         this.roles = this.roles.filter(u => u.id !== role.id);
         this.message.success();
      })
      .catch(error => {
          this.message.error(JSON.parse(error._body).message);
      })
      

    
  }

}
