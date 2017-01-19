import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../modules/user/user';

import { environment } from '../../environments/environment';

import { Service } from '../shared/service';

@Injectable()
export class LoginService extends Service{
  constructor(private http: Http) {
    super();
  }

  getToken(): Promise<any> {
    return this.http.get(environment.host + "/token" )
               .map(response => response.json() as any)
               .toPromise();
  }

  get(username: string, password: string): Promise<User> {
    this.setHeader("Authorization","Basic " + btoa(username + ":" + password));

    return this.http.get(environment.host + "/user", this.getRequestOptions() )
               .map(response => response.json() as User)
               .toPromise();
  }

  login(username: string, password: string): Promise<User> {
    this.setHeader("Content-Type","application/x-www-form-urlencoded");

    return this.http.post(environment.host + "/login", "username="+username+"&password="+password,this.getRequestOptions() )
               .toPromise();
  }

}
