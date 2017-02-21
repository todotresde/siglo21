import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ManufacturingOrder } from './manufacturingOrder';

import { environment } from 'environments/environment';

@Injectable()
export class ManufacturingOrderService {
  constructor(private http: Http) { }

  getAll(): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder")
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  getAllByStatus(status: Number): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/status/" + status)
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  search(from: Date, to: Date, lineId: number, manufacturingOrderCode: string, traceCode: string): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/search/from/" + from + "/to/" + to + "/lineId/" + lineId + "/manufacturingOrderCode/" + manufacturingOrderCode + "/traceCode/" + traceCode + "/")
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  get(id: Number): Promise<ManufacturingOrder> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/" + id)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  remove(manufacturingOrder: ManufacturingOrder): Promise<number> {
    return this.http.delete(environment.hosts.line + "/manufacturingOrder/" + manufacturingOrder.id)
               .map(response => response.json() as number)
               .toPromise();
  }

  save(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.post(environment.hosts.line + "/manufacturingOrder", manufacturingOrder)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  send(id: Number): Promise<ManufacturingOrder> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/" + id + "/send")
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

}
