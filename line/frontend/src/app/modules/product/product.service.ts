import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private http: Http) { }

  getAll(): Promise<Product[]> {
    return this.http.get(environment.host + "/product")
               .map(response => response.json() as Product[])
               .toPromise();
  }

  get(id: Number): Promise<Product> {
    return this.http.get(environment.host + "/product/" + id)
               .map(response => response.json() as Product)
               .toPromise();
  }

  remove(product: Product): Promise<Product> {
    return this.http.delete(environment.host + "/product/" + product.id)
               .map(response => response.json() as Product)
               .toPromise();
  }

  save(product: Product): Promise<Product> {
    return this.http.post(environment.host + "/product", product)
               .map(response => response.json() as Product)
               .toPromise();
  }

}
