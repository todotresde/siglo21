import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Line } from './line';

@Injectable()
export class LineService {
  constructor(private http: Http) { }

  getAll(): Promise<Line[]> {
    return this.http.get(environment.hosts.line + "/line")
               .map(response => response.json() as Line[])
               .toPromise();
  }

  get(id: Number): Promise<Line> {
    return this.http.get(environment.hosts.line + "/line/" + id)
               .map(response => response.json() as Line)
               .toPromise();
  }

  remove(line: Line): Promise<number> {
    return this.http.delete(environment.hosts.line + "/line/" + line.id)
               .map(response => response.json() as number)
               .toPromise();
  }

  save(line: Line): Promise<Line> {
    return this.http.post(environment.hosts.line + "/line", line)
               .map(response => response.json() as Line)
               .toPromise();
  }

}
