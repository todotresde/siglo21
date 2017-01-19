import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Role } from '../role';
import { RoleService } from '../role.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  providers:[RoleService]
})
export class RoleDetailComponent implements OnInit {
  message: Message = new Message();
  role : Role;

  constructor(private route: ActivatedRoute, private roleService: RoleService) { 
    this.role = new Role();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.roleService.get(params["id"]).then(role =>{ 
          this.role = role;
        });
      }
    });
  }

  save(): void {
    this.roleService
        .save(this.role)
        .then(role => {
          this.role = role; 
          
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
