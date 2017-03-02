import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { Route } from './route';

@Injectable()
export class RouteService extends Service {
  constructor(private http: Http) { super(); }

  getAll(): Promise<Route[]> {
    return this.http.get(environment.hosts.security + "/route", this.getRequestOptions())
               .map(response => response.json() as Route[])
               .toPromise();
  }

  get(id: Number): Promise<Route> {
    return this.http.get(environment.hosts.security + "/route/" + id, this.getRequestOptions())
               .map(response => response.json() as Route)
               .toPromise();
  }

  remove(route: Route): Promise<Route> {
    return this.http.delete(environment.hosts.security + "/route/" + route.id, this.getRequestOptions())
               .map(response => response.json() as Route)
               .toPromise();
  }

  save(route: Route): Promise<Route> {
    return this.http.post(environment.hosts.security + "/route", route, this.getRequestOptions())
               .map(response => response.json() as Route)
               .toPromise();
  }

}
