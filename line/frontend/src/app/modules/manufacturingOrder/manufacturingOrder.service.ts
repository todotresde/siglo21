import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ManufacturingOrder } from './manufacturingOrder';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';

@Injectable()
export class ManufacturingOrderService extends Service{
  constructor(private http: Http) { super(); }

  getAll(): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder", this.getRequestOptions())
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  getAllByStatus(status: Number): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/status/" + status, this.getRequestOptions())
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  search(from: Date, to: Date, lineId: number, manufacturingOrderCode: string, traceCode: string): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/search/from/" + from + "/to/" + to + "/lineId/" + lineId + "/manufacturingOrderCode/" + manufacturingOrderCode + "/traceCode/" + traceCode + "/", this.getRequestOptions())
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  get(id: Number): Promise<ManufacturingOrder> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/" + id, this.getRequestOptions())
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  remove(manufacturingOrder: ManufacturingOrder): Promise<number> {
    return this.http.delete(environment.hosts.line + "/manufacturingOrder/" + manufacturingOrder.id, this.getRequestOptions())
               .map(response => response.json() as number)
               .toPromise();
  }

  save(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.post(environment.hosts.line + "/manufacturingOrder", manufacturingOrder, this.getRequestOptions())
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  send(id: Number): Promise<ManufacturingOrder> {
    return this.http.get(environment.hosts.line + "/manufacturingOrder/" + id + "/send", this.getRequestOptions())
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

}
