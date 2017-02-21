import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { DelayType } from './delayType';

@Injectable()
export class DelayTypeService {
  constructor(private http: Http) { }

  getAll(): Promise<DelayType[]> {
    return this.http.get(environment.hosts.line + "/delayType")
               .map(response => response.json() as DelayType[])
               .toPromise();
  }

  get(id: Number): Promise<DelayType> {
    return this.http.get(environment.hosts.line + "/delayType/" + id)
               .map(response => response.json() as DelayType)
               .toPromise();
  }

  remove(delayType: DelayType): Promise<DelayType> {
    return this.http.delete(environment.hosts.line + "/delayType/" + delayType.id)
               .map(response => response.json() as DelayType)
               .toPromise();
  }

  save(delayType: DelayType): Promise<DelayType> {
    return this.http.post(environment.hosts.line + "/delayType", delayType)
               .map(response => response.json() as DelayType)
               .toPromise();
  }

}
