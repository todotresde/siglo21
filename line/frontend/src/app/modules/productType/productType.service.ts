import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { ProductType } from './productType';

@Injectable()
export class ProductTypeService {
  constructor(private http: Http) { }

  getAll(): Promise<ProductType[]> {
    return this.http.get(environment.host + "/productType")
               .map(response => response.json() as ProductType[])
               .toPromise();
  }

  get(id: Number): Promise<ProductType> {
    return this.http.get(environment.host + "/productType/" + id)
               .map(response => response.json() as ProductType)
               .toPromise();
  }

  remove(productType: ProductType): Promise<ProductType> {
    return this.http.delete(environment.host + "/productType/" + productType.id)
               .map(response => response.json() as ProductType)
               .toPromise();
  }

  save(productType: ProductType): Promise<ProductType> {
    return this.http.post(environment.host + "/productType", productType)
               .map(response => response.json() as ProductType)
               .toPromise();
  }

}
