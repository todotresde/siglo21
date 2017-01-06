import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../../product/product';
import { ProductService } from '../../../product/product.service';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct'

@Component({
  selector: 'app-manufacturing-order-product-detail',
  templateUrl: './manufacturingOrderProduct-detail.component.html',
  styleUrls: ['./manufacturingOrderProduct-detail.component.css'],
  providers:[ProductService]
})
export class ManufacturingOrderProductDetailComponent implements OnInit {
  @Input() inputManufacturingOrderProduct = new ManufacturingOrderProduct();
  @Output() outputManufacturingOrderProduct = new EventEmitter<ManufacturingOrderProduct>();

  products : Product[];
  manufacturingOrderProduct: ManufacturingOrderProduct;
  
  constructor(private route: ActivatedRoute, private productService: ProductService) { 
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

  ngOnInit() : void{
    this.productService.getProducts().then(products => this.products = products);
  }

  add(manufacturingOrderProduct: ManufacturingOrderProduct): void{
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
    this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

}