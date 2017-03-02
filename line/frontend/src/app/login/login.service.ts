import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { User } from 'app/modules/user';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';

@Injectable()
export class LoginService extends Service {
    constructor(private http: Http) {
        super();
    }

    getToken(): Promise < any > {
        return this.http.get(environment.hosts.base + "/token")
            .map(response => response.json() as any)
            .toPromise();
    }

    /*
    get(username: string, password: string): Promise<User> {
      this.setHeader("Authorization","Basic " + btoa(username + ":" + password));

      return this.http.get(environment.hosts.line + "/user", this.getRequestOptions() )
                 .map(response => response.json() as User)
                 .toPromise();
    }
    */

    login(username: string, password: string, token: string): Promise < any > {
        this.setHeader("Content-Type", "application/x-www-form-urlencoded");
        //this.setHeader("Cookie", localStorage.getItem("Cookie"));


        return this.http.post(environment.hosts.base + "/login", "username=" + username + "&password=" + password, this.getRequestOptions())
            .map((res: Response) => {
                if (res) {
                    if (res.status === 201) {
                        return [{ status: res.status, json: res }]
                    } else if (res.status === 200) {
                        return [{ status: res.status, json: res }]
                    }
                }
            }).catch((error: any) => {
                if (error.status === 500) {
                    return Observable.throw(new Error(error.status));
                } else if (error.status === 400) {
                    return Observable.throw(new Error(error.status));
                } else if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                } else if (error.status === 406) {
                    return Observable.throw(new Error(error.status));
                } else if (error.status === 0) {
                    return [{ status: error.status, json: {} }]
                }
            }).toPromise();
    }

}
