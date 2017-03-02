import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { Role } from './role';

@Injectable()
export class RoleService extends Service  {
  constructor(private http: Http) { super(); }

  getAll(): Promise<Role[]> {
    return this.http.get(environment.hosts.security + "/role", this.getRequestOptions())
               .map(response => response.json() as Role[])
               .toPromise();
  }

  get(id: Number): Promise<Role> {
    return this.http.get(environment.hosts.security + "/role/" + id, this.getRequestOptions())
               .map(response => response.json() as Role)
               .toPromise();
  }

  remove(role: Role): Promise<Role> {
    return this.http.delete(environment.hosts.security + "/role/" + role.id, this.getRequestOptions())
               .map(response => response.json() as Role)
               .toPromise();
  }

  save(role: Role): Promise<Role> {
    return this.http.post(environment.hosts.security + "/role", role, this.getRequestOptions())
               .map(response => response.json() as Role)
               .toPromise();
  }

}
