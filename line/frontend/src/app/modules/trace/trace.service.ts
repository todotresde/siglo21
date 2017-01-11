import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Trace } from './trace';

@Injectable()
export class TraceService {
  constructor(private http: Http) { }

  getAll(): Promise<Trace[]> {
    return this.http.get("http://localhost:8080/trace")
               .map(response => response.json() as Trace[])
               .toPromise();
  }

  get(id: Number): Promise<Trace> {
    return this.http.get("http://localhost:8080/trace/" + id)
               .map(response => response.json() as Trace)
               .toPromise();
  }

  remove(trace: Trace): Promise<Trace> {
    return this.http.delete("http://localhost:8080/trace/" + trace.id)
               .map(response => response.json() as Trace)
               .toPromise();
  }

  save(trace: Trace): Promise<Trace> {
    return this.http.post("http://localhost:8080/trace", trace)
               .map(response => response.json() as Trace)
               .toPromise();
  }

}
