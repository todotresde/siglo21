import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Trace } from './trace';

import { environment } from '../../../environments/environment';

@Injectable()
export class TraceService {
  constructor(private http: Http) { }

  getAll(): Promise<Trace[]> {
    return this.http.get(environment.host + "/trace")
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByWorkStation(id: Number): Promise<Trace[]> {
    return this.http.get(environment.host + "/trace/workStation/" + id)
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByLineAndWorkStation(lineId: Number, workStationID: Number): Promise<Trace[]> {
    return this.http.get(environment.host + "/trace/line/" + lineId + "/workStation/" + workStationID)
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByLineAndWorkStationAndStatus(lineId: Number, workStationID: Number, status: Number): Promise<Trace[]> {
    return this.http.get(environment.host + "/trace/line/" + lineId + "/workStation/" + workStationID + "/status/" + status)
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  get(id: Number): Promise<Trace> {
    return this.http.get(environment.host + "/trace/" + id)
               .map(response => response.json() as Trace)
               .toPromise();
  }

  remove(trace: Trace): Promise<Trace> {
    return this.http.delete(environment.host + "/trace/" + trace.id)
               .map(response => response.json() as Trace)
               .toPromise();
  }

  save(trace: Trace): Promise<Trace> {
    return this.http.post(environment.host + "/trace", trace)
               .map(response => response.json() as Trace)
               .toPromise();
  }

  finish(trace: Trace): Promise<Trace> {
    return this.http.post(environment.host + "/trace/finish", trace)
               .map(response => response.json() as Trace)
               .toPromise();
  }

}
