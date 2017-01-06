import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ProductType } from './productType';

@Injectable()
export class ProductTypeService {
  constructor(private http: Http) { }

  getProductTypes(): Promise<ProductType[]> {
    return this.http.get("http://localhost:8080/productType")
               .toPromise()
               .then(response => response.json() as ProductType[]);
  }

  getProductType(id: Number): Promise<ProductType> {
    return this.http.get("http://localhost:8080/productType/" + id)
               .toPromise()
               .then(response => response.json() as ProductType);
  }

  removeProductType(productType: ProductType): Promise<ProductType> {
    return this.http.delete("http://localhost:8080/productType/" + productType.id)
               .toPromise()
               .then(response => response.json() as ProductType);
  }

  save(productType: ProductType): Promise<ProductType> {
    return this.http.post("http://localhost:8080/productType", productType)
               .toPromise()
               .then(response => response.json() as ProductType);
  }

}
