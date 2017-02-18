import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

import { Message } from 'app/shared';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {
  message: Message = new Message();
  products: Product[];

  constructor(private router: Router, private productService: ProductService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.productService
      .getAll()
      .then(products => this.products = products)
      .catch(error => {
          this.message.error(JSON.parse(error._body).message);
      })
  }

  create(): void {
    this.router.navigate(['../product'],{ relativeTo: this.r });
  }

  edit(product: Product): void {
    this.router.navigate(['../product', product.id],{ relativeTo: this.r });
  }

  remove(product: Product): void {
    this.productService
      .remove(product)
      .then(product => this.products = this.products.filter(u => u.id !== product.id))
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

}
