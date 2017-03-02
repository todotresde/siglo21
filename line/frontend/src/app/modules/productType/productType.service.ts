import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { ProductType } from './productType';

@Injectable()
export class ProductTypeService  extends Service {
  constructor(private http: Http) { super(); }

  getAll(): Promise<ProductType[]> {
    return this.http.get(environment.hosts.product + "/productType", this.getRequestOptions())
               .map(response => response.json() as ProductType[])
               .toPromise();
  }

  get(id: Number): Promise<ProductType> {
    return this.http.get(environment.hosts.product + "/productType/" + id, this.getRequestOptions())
               .map(response => response.json() as ProductType)
               .toPromise();
  }

  getByNameURL(name: string = ""): string{
    return environment.hosts.product + "/product/byName/" + name;
  }

  getByName(name: string): Promise<ProductType[]> {
    return this.http.get(this.getByNameURL(name), this.getRequestOptions())
               .map(response => response.json() as ProductType[])
               .toPromise();
  }

  remove(productType: ProductType): Promise<ProductType> {
    return this.http.delete(environment.hosts.product + "/productType/" + productType.id, this.getRequestOptions())
               .map(response => response.json() as ProductType)
               .toPromise();
  }

  save(productType: ProductType): Promise<ProductType> {
    return this.http.post(environment.hosts.product + "/productType", productType, this.getRequestOptions())
               .map(response => response.json() as ProductType)
               .toPromise();
  }

}
