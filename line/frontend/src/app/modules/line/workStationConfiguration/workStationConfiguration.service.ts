import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { WorkStationConfiguration } from './workStationConfiguration';

@Injectable()
export class WorkStationConfigurationService extends Service{
  constructor(private http: Http) { super(); }

  getAll(): Promise<WorkStationConfiguration[]> {
    return this.http.get(environment.hosts.line + "/workStationConfiguration", this.getRequestOptions())
               .map(response => response.json() as WorkStationConfiguration[])
               .toPromise();
  }

  get(id: Number): Promise<WorkStationConfiguration> {
    return this.http.get(environment.hosts.line + "/workStationConfiguration/" + id, this.getRequestOptions())
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

  getByLineAndWorkStation(lineId: Number, workStationId: Number): Promise<WorkStationConfiguration> {
    return this.http.get(environment.hosts.line + "/workStationConfiguration/line/" + lineId + "/workStation/" + workStationId, this.getRequestOptions())
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

  remove(workStationConfiguration: WorkStationConfiguration): Promise<WorkStationConfiguration> {
    return this.http.delete(environment.hosts.line + "/workStationConfiguration/" + workStationConfiguration.id, this.getRequestOptions())
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

  save(workStationConfiguration: WorkStationConfiguration): Promise<WorkStationConfiguration> {
    return this.http.post(environment.hosts.line + "/workStationConfiguration", workStationConfiguration, this.getRequestOptions())
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

}
