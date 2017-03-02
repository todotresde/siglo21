import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { Line, WorkStationConfiguration } from 'app/modules/line';
import { Delay } from './delay';


@Injectable()
export class DelayService extends Service{
  constructor(private http: Http) { super(); }

  getAll(): Promise<Delay[]> {
    return this.http.get(environment.hosts.line + "/delay", this.getRequestOptions())
               .map(response => response.json() as Delay[])
               .toPromise();
  }

  get(id: Number): Promise<Delay> {
    return this.http.get(environment.hosts.line + "/delay/" + id, this.getRequestOptions())
               .map(response => response.json() as Delay)
               .toPromise();
  }

  remove(delay: Delay): Promise<Delay> {
    return this.http.delete(environment.hosts.line + "/delay/" + delay.id, this.getRequestOptions())
               .map(response => response.json() as Delay)
               .toPromise();
  }

  save(delay: Delay): Promise<Delay> {
    return this.http.post(environment.hosts.line + "/delay", delay, this.getRequestOptions())
               .map(response => response.json() as Delay)
               .toPromise();
  }

  search(line: Line, from: Date, to: Date): Promise<WorkStationConfiguration[]> {
    return this.http.get(environment.hosts.line + "/delay/line/" + line.id + "/from/" + from + "/to/" + to, this.getRequestOptions())
               .map(response => response.json() as WorkStationConfiguration[])
               .toPromise();
  }

}
