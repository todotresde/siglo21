import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../../product/product';
import { ProductService } from '../../../product/product.service';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct'

@Component({
  selector: 'app-manufacturing-order-product-detail',
  templateUrl: './manufacturingOrderProduct-detail.component.html',
  providers:[ProductService]
})
export class ManufacturingOrderProductDetailComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderProduct = new ManufacturingOrderProduct();
  @Output() outputManufacturingOrderProduct = new EventEmitter<ManufacturingOrderProduct>();

  products : Product[];
  manufacturingOrderProduct: ManufacturingOrderProduct;
  
  constructor(private route: ActivatedRoute, private productService: ProductService) { 
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

  ngOnInit() : void{
    this.productService.getAll().then(products => this.products = products);
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputManufacturingOrderProduct"].currentValue)
      this.manufacturingOrderProduct = changes["inputManufacturingOrderProduct"].currentValue;
    else
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

  add(manufacturingOrderProduct: ManufacturingOrderProduct): void{
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
    this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

  update(manufacturingOrderProduct: ManufacturingOrderProduct): void{
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
  }

}
