import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkStation } from './workStation';

@Injectable()
export class WorkStationService {
  constructor(private http: Http) { }

  getWorkStations(): Promise<WorkStation[]> {
    return this.http.get("http://localhost:8080/workStation")
               .toPromise()
               .then(response => response.json() as WorkStation[]);
  }

  getWorkStation(id: Number): Promise<WorkStation> {
    return this.http.get("http://localhost:8080/workStation/" + id)
               .toPromise()
               .then(response => response.json() as WorkStation);
  }

  removeWorkStation(workStation: WorkStation): Promise<WorkStation> {
    return this.http.delete("http://localhost:8080/workStation/" + workStation.id)
               .toPromise()
               .then(response => response.json() as WorkStation);
  }

  save(workStation: WorkStation): Promise<WorkStation> {
    return this.http.post("http://localhost:8080/workStation", workStation)
               .toPromise()
               .then(response => response.json() as WorkStation);
  }

}
