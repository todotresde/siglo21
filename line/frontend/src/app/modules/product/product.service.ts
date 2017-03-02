import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

import { Service } from 'app/shared';
import { Product } from './product';

@Injectable()
export class ProductService extends Service{
  constructor(private http: Http) { super(); }

  getAll(): Promise<Product[]> {
    return this.http.get( environment.hosts.product + "/product", this.getRequestOptions())
               .map(response => response.json() as Product[])
               .toPromise();
  }

  getUrl(id: Number): string {
    return environment.hosts.product + "/product/" + id;
  }

  get(id: Number): Promise<Product> {
    return this.http.get(this.getUrl(id), this.getRequestOptions())
               .map(response => response.json() as Product)
               .toPromise();
  }

  getByDescriptionURL(description: string = ""): string{
    return environment.hosts.product + "/product/byDescription/" + description;
  }

  getByDescription(description: string): Promise<Product[]> {
    return this.http.get(this.getByDescriptionURL(description), this.getRequestOptions())
               .map(response => response.json() as Product[])
               .toPromise();
  }

  remove(product: Product): Promise<Product> {
    return this.http.delete(environment.hosts.product + "/product/" + product.id, this.getRequestOptions())
               .map(response => response.json() as Product)
               .toPromise();
  }

  save(product: Product): Promise<Product> {
    return this.http.post(environment.hosts.product + "/product", product, this.getRequestOptions())
               .map(response => response.json() as Product)
               .toPromise();
  }

}
