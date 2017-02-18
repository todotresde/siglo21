import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll(): Promise<User[]> {
    return this.http.get(environment.host + "/user")
               .map(response => response.json() as User[])
               .toPromise();
  }

  get(id: Number): Promise<User> {
    return this.http.get(environment.host + "/user/" + id)
               .map(response => response.json() as User)
               .toPromise();
  }

  remove(user: User): Promise<User> {
    return this.http.delete(environment.host + "/user/" + user.id)
               .map(response => response.json() as User)
               .toPromise();
  }

  save(user: User): Promise<User> {
    return this.http.post(environment.host + "/user", user)
               .map(response => response.json() as User)
               .toPromise();
  }

}
