import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ManufacturingOrder } from './manufacturingOrder';

import { environment } from '../../../environments/environment';

@Injectable()
export class ManufacturingOrderService {
  constructor(private http: Http) { }

  getAll(): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.host + "/manufacturingOrder")
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  getAllByStatus(status: Number): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.host + "/manufacturingOrder/status/" + status)
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  search(from: Date, to: Date, lineId: number, manufacturingOrderCode: string, traceCode: string): Promise<ManufacturingOrder[]> {
    return this.http.get(environment.host + "/manufacturingOrder/search/from/" + from + "/to/" + to + "/lineId/" + lineId + "/manufacturingOrderCode/" + manufacturingOrderCode + "/traceCode/" + traceCode + "/")
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  get(id: Number): Promise<ManufacturingOrder> {
    return this.http.get(environment.host + "/manufacturingOrder/" + id)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  remove(manufacturingOrder: ManufacturingOrder): Promise<number> {
    return this.http.delete(environment.host + "/manufacturingOrder/" + manufacturingOrder.id)
               .map(response => response.json() as number)
               .toPromise();
  }

  save(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.post(environment.host + "/manufacturingOrder", manufacturingOrder)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  send(id: Number): Promise<ManufacturingOrder> {
    return this.http.get(environment.host + "/manufacturingOrder/" + id + "/send")
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

}
