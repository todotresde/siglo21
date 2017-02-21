import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private http: Http) { }

  getAll(): Promise<Product[]> {
    return this.http.get( environment.hosts.product + "/product")
               .map(response => response.json() as Product[])
               .toPromise();
  }

  getUrl(id: Number): string {
    return environment.hosts.product + "/product/" + id;
  }

  get(id: Number): Promise<Product> {
    return this.http.get(this.getUrl(id))
               .map(response => response.json() as Product)
               .toPromise();
  }

  getByDescriptionURL(description: string = ""): string{
    return environment.hosts.product + "/product/byDescription/" + description;
  }

  getByDescription(description: string): Promise<Product[]> {
    return this.http.get(this.getByDescriptionURL(description))
               .map(response => response.json() as Product[])
               .toPromise();
  }

  remove(product: Product): Promise<Product> {
    return this.http.delete(environment.hosts.product + "/product/" + product.id)
               .map(response => response.json() as Product)
               .toPromise();
  }

  save(product: Product): Promise<Product> {
    return this.http.post(environment.hosts.product + "/product", product)
               .map(response => response.json() as Product)
               .toPromise();
  }

}
