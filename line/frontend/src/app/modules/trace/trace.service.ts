import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { Trace } from './trace';

@Injectable()
export class TraceService extends Service {
  constructor(private http: Http) { super(); }

  getAll(): Promise<Trace[]> {
    return this.http.get(environment.hosts.line + "/trace", this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByWorkStation(id: Number): Promise<Trace[]> {
    return this.http.get(environment.hosts.line + "/trace/workStation/" + id, this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByLineAndWorkStation(lineId: Number, workStationID: Number): Promise<Trace[]> {
    return this.http.get(environment.hosts.line + "/trace/line/" + lineId + "/workStation/" + workStationID, this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByLineAndWorkStationAndStatus(lineId: Number, workStationID: Number, status: Number): Promise<Trace[]> {
    return this.http.get(environment.hosts.line + "/trace/line/" + lineId + "/workStation/" + workStationID + "/status/" + status, this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAllByManufacturingOrder(manufacturingOrderId: Number): Promise<Trace[]> {
    return this.http.get(environment.hosts.line + "/trace/manufacturingOrder/" + manufacturingOrderId, this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  get(id: Number): Promise<Trace> {
    return this.http.get(environment.hosts.line + "/trace/" + id, this.getRequestOptions())
               .map(response => response.json() as Trace)
               .toPromise();
  }

  remove(trace: Trace): Promise<Trace> {
    return this.http.delete(environment.hosts.line + "/trace/" + trace.id, this.getRequestOptions())
               .map(response => response.json() as Trace)
               .toPromise();
  }

  save(trace: Trace): Promise<Trace> {
    return this.http.post(environment.hosts.line + "/trace", trace, this.getRequestOptions())
               .map(response => response.json() as Trace)
               .toPromise();
  }

  multipleSave(traces: Trace[]): Promise<Trace[]> {
    return this.http.post(environment.hosts.line + "/traces", traces, this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  finish(traces: Trace[]): Promise<Trace[]> {
    return this.http.post(environment.hosts.line + "/trace/finish", traces, this.getRequestOptions())
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  getAverageByLineAndWorkStation(lineId: Number, workStationId: Number): Promise<any>{
    let previousTraces: Trace[] = [];
    let currentTraces: Trace[] = [];
    let result: any = {
      previousAverage : 0,
      currentAverage : 0,
      difference : 0
    };
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);

    return new Promise((resolve: any, reject) => {
        this.getAllByLineAndWorkStationAndStatus(lineId, workStationId, 2)
          .then(traces => {
            traces.forEach(t => {
              let trace = new Trace(t);
              (trace.endTime.getTime() < today.getTime()) ? previousTraces.push(trace) : currentTraces.push(trace);
            });

            previousTraces.forEach(t => {
              result.previousAverage =+ Math.round(t.time / previousTraces.length);
            });

            currentTraces.forEach(t => {
              result.currentAverage =+ Math.round(t.time / currentTraces.length);
            });

            result.difference = Math.round(result.previousAverage - result.currentAverage);
            
            resolve(result);
          })
          .catch(error => reject(error))
    });

  }

  
}
