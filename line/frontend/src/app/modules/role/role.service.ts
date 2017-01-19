import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { Role } from './role';

@Injectable()
export class RoleService {
  constructor(private http: Http) { }

  getAll(): Promise<Role[]> {
    return this.http.get(environment.host + "/role")
               .map(response => response.json() as Role[])
               .toPromise();
  }

  get(id: Number): Promise<Role> {
    return this.http.get(environment.host + "/role/" + id)
               .map(response => response.json() as Role)
               .toPromise();
  }

  remove(role: Role): Promise<Role> {
    return this.http.delete(environment.host + "/role/" + role.id)
               .map(response => response.json() as Role)
               .toPromise();
  }

  save(role: Role): Promise<Role> {
    return this.http.post(environment.host + "/role", role)
               .map(response => response.json() as Role)
               .toPromise();
  }

}
