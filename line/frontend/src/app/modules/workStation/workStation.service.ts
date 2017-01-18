import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { Service } from '../../shared/service';
import { WorkStation } from './workStation';

@Injectable()
export class WorkStationService extends Service{
  constructor(private http: Http) {
    super();
  }

  getAll(): Promise<WorkStation[]> {
    return this.http.get(environment.host + "/workStation", { headers : this.getHeaders() })
               .map(response => response.json() as WorkStation[])
               .toPromise();
  }

  get(id: Number): Promise<WorkStation> {
    return this.http.get(environment.host + "/workStation/" + id, { headers : this.getHeaders() })
               .map(response => response.json() as WorkStation)
               .toPromise();
  }

  remove(workStation: WorkStation): Promise<WorkStation> {
    return this.http.delete(environment.host + "/workStation/" + workStation.id, { headers : this.getHeaders() })
               .map(response => response.json() as WorkStation)
               .toPromise();
  }

  save(workStation: WorkStation): Promise<WorkStation> {
    return this.http.post(environment.host + "/workStation", workStation, { headers : this.getHeaders() })
               .map(response => response.json() as WorkStation)
               .toPromise();
  }

}
