import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkStationConfiguration } from './workStationConfiguration';

@Injectable()
export class WorkStationConfigurationService {
  constructor(private http: Http) { }

  getWorkStationConfigurations(): Promise<WorkStationConfiguration[]> {
    return this.http.get("http://localhost:8080/workStationConfiguration")
               .toPromise()
               .then(response => response.json() as WorkStationConfiguration[]);
  }

  getWorkStationConfiguration(id: Number): Promise<WorkStationConfiguration> {
    return this.http.get("http://localhost:8080/workStationConfiguration/" + id)
               .toPromise()
               .then(response => response.json() as WorkStationConfiguration);
  }

  removeWorkStationConfiguration(workStationConfiguration: WorkStationConfiguration): Promise<WorkStationConfiguration> {
    return this.http.delete("http://localhost:8080/workStationConfiguration/" + workStationConfiguration.id)
               .toPromise()
               .then(response => response.json() as WorkStationConfiguration);
  }

  save(workStationConfiguration: WorkStationConfiguration): Promise<WorkStationConfiguration> {
    return this.http.post("http://localhost:8080/workStationConfiguration", workStationConfiguration)
               .toPromise()
               .then(response => response.json() as WorkStationConfiguration);
  }

}
