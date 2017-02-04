import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../../environments/environment';

import { WorkStationConfiguration } from './workStationConfiguration';

@Injectable()
export class WorkStationConfigurationService {
  constructor(private http: Http) { }

  getAll(): Promise<WorkStationConfiguration[]> {
    return this.http.get(environment.host + "/workStationConfiguration")
               .map(response => response.json() as WorkStationConfiguration[])
               .toPromise();
  }

  get(id: Number): Promise<WorkStationConfiguration> {
    return this.http.get(environment.host + "/workStationConfiguration/" + id)
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

  getByLineAndWorkStation(lineId: Number, workStationId: Number): Promise<WorkStationConfiguration> {
    return this.http.get(environment.host + "/workStationConfiguration/line/" + lineId + "/workStation/" + workStationId)
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

  remove(workStationConfiguration: WorkStationConfiguration): Promise<WorkStationConfiguration> {
    return this.http.delete(environment.host + "/workStationConfiguration/" + workStationConfiguration.id)
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

  save(workStationConfiguration: WorkStationConfiguration): Promise<WorkStationConfiguration> {
    return this.http.post(environment.host + "/workStationConfiguration", workStationConfiguration)
               .map(response => response.json() as WorkStationConfiguration)
               .toPromise();
  }

}
