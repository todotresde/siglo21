import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderProduct } from '../../manufacturingOrderProduct/manufacturingOrderProduct'
import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct'

@Component({
  selector: 'app-manufacturing-order-custom-product-detail',
  templateUrl: './manufacturingOrderCustomProduct-detail.component.html',
  providers:[]
})
export class ManufacturingOrderCustomProductDetailComponent implements OnInit {
  @Input() inputManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  @Output() outputManufacturingOrderCustomProduct = new EventEmitter<ManufacturingOrderCustomProduct>();

  manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct;
  
  constructor(private route: ActivatedRoute) { 
      this.manufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  }

  ngOnInit() : void{
  }

  addManufacturingOrderCustomProduct(manufacturingOrderProducts: ManufacturingOrderProduct[]): void{
    this.manufacturingOrderCustomProduct.manufacturingOrderProducts = manufacturingOrderProducts;
    this.outputManufacturingOrderCustomProduct.emit(this.manufacturingOrderCustomProduct);
  }

  update(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void{
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
  }
}
