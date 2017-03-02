import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { WorkStation } from './workStation';

@Injectable()
export class WorkStationService extends Service{
  constructor(private http: Http) {
    super();
  }

  getAll(): Promise<WorkStation[]> {
    //this.setHeader('X-Auth-Token', localStorage.getItem("X-Auth-Token"));
    //this.setHeader('Authorization', localStorage.getItem("Authorization"));

    return this.http.get(environment.hosts.line + "/workStation", this.getRequestOptions())
               .map(response => response.json() as WorkStation[])
               .toPromise();
  }

  get(id: Number): Promise<WorkStation> {
    return this.http.get(environment.hosts.line + "/workStation/" + id, this.getRequestOptions())
               .map(response => response.json() as WorkStation)
               .toPromise();
  }

  remove(workStation: WorkStation): Promise<WorkStation> {
    return this.http.delete(environment.hosts.line + "/workStation/" + workStation.id, this.getRequestOptions())
               .map(response => response.json() as WorkStation)
               .toPromise();
  }

  save(workStation: WorkStation): Promise<WorkStation> {
    return this.http.post(environment.hosts.line + "/workStation", workStation, this.getRequestOptions())
               .map(response => response.json() as WorkStation)
               .toPromise();
  }

}
