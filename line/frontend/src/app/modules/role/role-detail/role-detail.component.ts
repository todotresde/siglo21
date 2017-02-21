import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Role } from '../role';
import { RoleService } from '../role.service';

import { Message, Commons } from 'app/shared';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  providers:[RoleService]
})
export class RoleDetailComponent implements OnInit {
  message: Message = new Message();
  role : Role;

  constructor(private location: Location, private route: ActivatedRoute, private roleService: RoleService) { 
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
          this.message.success("");

          Commons.delay().then(() => {
            this.back();
          });
        })
        .catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

  back(): void {
    this.location.back();
  }

}
