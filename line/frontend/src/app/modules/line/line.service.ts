import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Line } from './line';

@Injectable()
export class LineService {
  constructor(private http: Http) { }

  getLines(): Promise<Line[]> {
    return this.http.get("http://localhost:8080/line")
               .toPromise()
               .then(response => response.json() as Line[]);
  }

  getLine(id: Number): Promise<Line> {
    return this.http.get("http://localhost:8080/line/" + id)
               .toPromise()
               .then(response => response.json() as Line);
  }

  removeLine(line: Line): Promise<Line> {
    return this.http.delete("http://localhost:8080/line/" + line.id)
               .toPromise()
               .then(response => response.json() as Line);
  }

  save(line: Line): Promise<Line> {
    return this.http.post("http://localhost:8080/line", line)
               .toPromise()
               .then(response => response.json() as Line);
  }

}
