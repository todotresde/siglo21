import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkStationProductTypes } from './workStationProductTypes';

@Injectable()
export class WorkStationProductTypesService {
  constructor(private http: Http) { }

  getWorkStationProductTypess(): Promise<WorkStationProductTypes[]> {
    return this.http.get("http://localhost:8080/workStationProductTypes")
               .toPromise()
               .then(response => response.json() as WorkStationProductTypes[]);
  }

  getWorkStationProductTypes(id: Number): Promise<WorkStationProductTypes> {
    return this.http.get("http://localhost:8080/workStationProductTypes/" + id)
               .toPromise()
               .then(response => response.json() as WorkStationProductTypes);
  }

  removeWorkStationProductTypes(workStationProductTypes: WorkStationProductTypes): Promise<WorkStationProductTypes> {
    return this.http.delete("http://localhost:8080/workStationProductTypes/" + workStationProductTypes.id)
               .toPromise()
               .then(response => response.json() as WorkStationProductTypes);
  }

  save(workStationProductTypes: WorkStationProductTypes): Promise<WorkStationProductTypes> {
    return this.http.post("http://localhost:8080/workStationProductTypes", workStationProductTypes)
               .toPromise()
               .then(response => response.json() as WorkStationProductTypes);
  }

}
