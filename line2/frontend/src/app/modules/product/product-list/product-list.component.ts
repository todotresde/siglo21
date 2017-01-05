import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private router: Router, private productService: ProductService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.productService.getProducts().then(products => this.products = products);
  }

  create(): void {
    this.router.navigate(['../product'],{ relativeTo: this.r });
  }

  edit(product: Product): void {
    this.router.navigate(['../product', product.id],{ relativeTo: this.r });
  }

  remove(product: Product): void {
    this.productService.removeProduct(product).then(product => this.products = this.products.filter(u => u.id !== product.id));
  }

}
