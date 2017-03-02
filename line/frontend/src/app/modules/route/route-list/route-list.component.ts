import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Route } from '../route';
import { RouteService } from '../route.service';

import { Message } from 'app/shared';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  providers:[RouteService]
})
export class RouteListComponent implements OnInit {
  message: Message = new Message();
  routes: Route[];

  constructor(private router: Router, private routeService: RouteService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.routeService.getAll()
      .then(routes => { this.routes = routes;})
      .catch(error => { 
        this.message.error(JSON.parse(error._body).message);
      });
  }

  create(): void {
    this.router.navigate(['../route'],{ relativeTo: this.r });
  }

  edit(route: Route): void {
    this.router.navigate(['../route', route.id],{ relativeTo: this.r });
  }

  remove(route: Route): void {
    this.routeService
      .remove(route)
      .then(route => {
         this.routes = this.routes.filter(u => u.id !== route.id);
         this.message.success();
      })
      .catch(error => {
          this.message.error(JSON.parse(error._body).message);
      })
      

    
  }

}
