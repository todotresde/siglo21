import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { Delay } from './delay';

@Injectable()
export class DelayService {
  constructor(private http: Http) { }

  getAll(): Promise<Delay[]> {
    return this.http.get(environment.host + "/delay")
               .map(response => response.json() as Delay[])
               .toPromise();
  }

  get(id: Number): Promise<Delay> {
    return this.http.get(environment.host + "/delay/" + id)
               .map(response => response.json() as Delay)
               .toPromise();
  }

  remove(delay: Delay): Promise<Delay> {
    return this.http.delete(environment.host + "/delay/" + delay.id)
               .map(response => response.json() as Delay)
               .toPromise();
  }

  save(delay: Delay): Promise<Delay> {
    return this.http.post(environment.host + "/delay", delay)
               .map(response => response.json() as Delay)
               .toPromise();
  }

}
