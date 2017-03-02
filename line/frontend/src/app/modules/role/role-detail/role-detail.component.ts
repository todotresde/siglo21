import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Role } from '../role';
import { RoleService } from '../role.service';
import { Route, RouteService } from 'app/modules/route';

import { Message, Commons } from 'app/shared';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  providers:[RoleService, RouteService]
})
export class RoleDetailComponent implements OnInit {
  message: Message = new Message();
  role : Role;
  routes : Route[] = [];
  selectedRoute : Route = new Route();

  constructor(private location: Location, private route: ActivatedRoute, private roleService: RoleService, private routeService: RouteService) { 
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

    this.routeService
      .getAll()
      .then(routes => this.routes = routes)
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

  add(route: Route): void {
    if(this.exist(route)){
      this.message.error("error-route-already-assigned");
    }else{
      this.role.routes.push(route);
      
      this.selectedRoute = new Route();
      this.message.none();
    }
  }

  remove(route: Route): void {
    this.role.routes = this.role.routes.filter(u => u.id !== route.id);
  }

  private exist(route: Route): boolean{
    let result: Route[] = this.role.routes.filter(u => u.id === route.id);
    return result.length > 0;
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
