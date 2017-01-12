import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { LineDelay } from './lineDelay';

@Injectable()
export class LineDelayService {
  constructor(private http: Http) { }

  getAll(): Promise<LineDelay[]> {
    return this.http.get(environment.host + "/lineDelay")
               .map(response => response.json() as LineDelay[])
               .toPromise();
  }

  get(id: Number): Promise<LineDelay> {
    return this.http.get(environment.host + "/lineDelay/" + id)
               .map(response => response.json() as LineDelay)
               .toPromise();
  }

  remove(lineDelay: LineDelay): Promise<LineDelay> {
    return this.http.delete(environment.host + "/lineDelay/" + lineDelay.id)
               .map(response => response.json() as LineDelay)
               .toPromise();
  }

  save(lineDelay: LineDelay): Promise<LineDelay> {
    return this.http.post(environment.host + "/lineDelay", lineDelay)
               .map(response => response.json() as LineDelay)
               .toPromise();
  }

}
