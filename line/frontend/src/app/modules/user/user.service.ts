import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get("http://localhost:8080/user")
               .toPromise()
               .then(response => response.json() as User[]);
  }

  getUser(id: Number): Promise<User> {
    return this.http.get("http://localhost:8080/user/" + id)
               .toPromise()
               .then(response => response.json() as User);
  }

  removeUser(user: User): Promise<User> {
    return this.http.delete("http://localhost:8080/user/" + user.id)
               .toPromise()
               .then(response => response.json() as User);
  }

  save(user: User): Promise<User> {
    return this.http.post("http://localhost:8080/user", user)
               .toPromise()
               .then(response => response.json() as User);
  }

}
