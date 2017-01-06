import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct';

@Component({
  selector: 'app-manufacturing-order-custom-product',
  templateUrl: './manufacturingOrderCustomProduct.component.html',
  styleUrls: ['./manufacturingOrderCustomProduct.component.css'],
  providers:[]
})
export class ManufacturingOrderCustomProductComponent implements OnInit {
  selectedManufacturingOrderCustomProduct: ManufacturingOrderCustomProduct;
  manufacturingOrderCustomProducts: ManufacturingOrderCustomProduct[] = [];

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() : void{
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
  	this.manufacturingOrderCustomProducts.push(manufacturingOrderCustomProduct);
  }

  setSelectedManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct) : void{
    this.selectedManufacturingOrderCustomProduct = manufacturingOrderCustomProduct;
  }
}
