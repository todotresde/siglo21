import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ManufacturingOrder } from './manufacturingOrder';

@Injectable()
export class ManufacturingOrderService {
  temporalManufacturingOrder: ManufacturingOrder;

  constructor(private http: Http) { }

  getAll(): Promise<ManufacturingOrder[]> {
    return this.http.get("http://localhost:8080/manufacturingOrder")
               .map(response => response.json() as ManufacturingOrder[])
               .toPromise();
  }

  get(id: Number): Promise<ManufacturingOrder> {
    return this.http.get("http://localhost:8080/manufacturingOrder/" + id)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  remove(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.delete("http://localhost:8080/manufacturingOrder/" + manufacturingOrder.id)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  save(manufacturingOrder: ManufacturingOrder): Promise<ManufacturingOrder> {
    return this.http.post("http://localhost:8080/manufacturingOrder", manufacturingOrder)
               .map(response => response.json() as ManufacturingOrder)
               .toPromise();
  }

  newTemporal(): ManufacturingOrder{
    this.temporalManufacturingOrder = new ManufacturingOrder();
    return this.temporalManufacturingOrder;
  } 

  getTemporal(): ManufacturingOrder{
    return this.temporalManufacturingOrder;
  } 

  setTemporal(manufacturingOrder: ManufacturingOrder): ManufacturingOrder{
    this.temporalManufacturingOrder = manufacturingOrder;
    return this.temporalManufacturingOrder;
  } 

}
