import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkStationUsers } from './workStationUsers';

@Injectable()
export class WorkStationUsersService {
  constructor(private http: Http) { }

  getWorkStationUserss(): Promise<WorkStationUsers[]> {
    return this.http.get("http://localhost:8080/workStationUsers")
               .toPromise()
               .then(response => response.json() as WorkStationUsers[]);
  }

  getWorkStationUsers(id: Number): Promise<WorkStationUsers> {
    return this.http.get("http://localhost:8080/workStationUsers/" + id)
               .toPromise()
               .then(response => response.json() as WorkStationUsers);
  }

  removeWorkStationUsers(workStationUsers: WorkStationUsers): Promise<WorkStationUsers> {
    return this.http.delete("http://localhost:8080/workStationUsers/" + workStationUsers.id)
               .toPromise()
               .then(response => response.json() as WorkStationUsers);
  }

  save(workStationUsers: WorkStationUsers): Promise<WorkStationUsers> {
    return this.http.post("http://localhost:8080/workStationUsers", workStationUsers)
               .toPromise()
               .then(response => response.json() as WorkStationUsers);
  }

}
