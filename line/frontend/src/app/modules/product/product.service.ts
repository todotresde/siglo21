import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private http: Http) { }

  getProducts(): Promise<Product[]> {
    return this.http.get("http://localhost:8080/product")
               .toPromise()
               .then(response => response.json() as Product[]);
  }

  getProduct(id: Number): Promise<Product> {
    return this.http.get("http://localhost:8080/product/" + id)
               .toPromise()
               .then(response => response.json() as Product);
  }

  removeProduct(product: Product): Promise<Product> {
    return this.http.delete("http://localhost:8080/product/" + product.id)
               .toPromise()
               .then(response => response.json() as Product);
  }

  save(product: Product): Promise<Product> {
    return this.http.post("http://localhost:8080/product", product)
               .toPromise()
               .then(response => response.json() as Product);
  }

}
