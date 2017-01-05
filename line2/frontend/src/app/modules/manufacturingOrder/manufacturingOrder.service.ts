import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ManufacturingOrder } from './manufacturingOrder';

@Injectable()
export class ManufacturingOrderService {
  constructor(private http: Http) { }

  getManufacturingOrders(): Promise<ManufacturingOrder[]> {
    return this.http.get("http://localhost:8080/manufacturingOrder")
               .toPromise()
               .then(response => response.json() as ManufacturingOrder[]);
  }

  getManufacturingOrder(id: Number): Promise<ManufacturingOrder> {
    return this.http.get("http://localhost:8080/manufacturingOrder/" + id)
               .toPromise()
               .then(response => response.json() as ManufacturingOrder);
  }

  removeManufacturingOrder(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.delete("http://localhost:8080/manufacturingOrder/" + manufacturingOrder.id)
               .toPromise()
               .then(response => response.json() as ManufacturingOrder);
  }

  save(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.post("http://localhost:8080/manufacturingOrder", manufacturingOrder)
               .toPromise()
               .then(response => response.json() as ManufacturingOrder);
  }

}
