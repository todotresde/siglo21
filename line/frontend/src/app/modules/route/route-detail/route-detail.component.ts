import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Route } from '../route';
import { RouteService } from '../route.service';

import { Message, Commons } from 'app/shared';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  providers:[RouteService]
})
export class RouteDetailComponent implements OnInit {
  message: Message = new Message();
  route : Route;

  constructor(private location: Location, private r: ActivatedRoute, private routeService: RouteService) { 
    this.route = new Route();
  }

  ngOnInit() : void{
    this.r.params.subscribe(params => {
      if(params["id"]){
        this.routeService.get(params["id"]).then(route =>{ 
          this.route = route;
        });
      }
    });
  }

  save(): void {
    this.routeService
        .save(this.route)
        .then(route => {
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
