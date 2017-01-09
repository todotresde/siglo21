import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get("http://localhost:8080/user")
               .map(response => response.json() as User[])
               .toPromise();
  }

  getUser(id: Number): Promise<User> {
    return this.http.get("http://localhost:8080/user/" + id)
               .map(response => response.json() as User)
               .toPromise();
  }

  removeUser(user: User): Promise<User> {
    return this.http.delete("http://localhost:8080/user/" + user.id)
               .map(response => response.json() as User)
               .toPromise();
  }

  save(user: User): Promise<User> {
    return this.http.post("http://localhost:8080/user", user)
               .map(response => response.json() as User)
               .toPromise();
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
