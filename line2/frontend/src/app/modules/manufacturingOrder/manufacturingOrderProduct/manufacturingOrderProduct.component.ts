import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderProduct } from './manufacturingOrderProduct';

@Component({
  selector: 'app-manufacturing-order-product',
  templateUrl: './manufacturingOrderProduct.component.html',
  styleUrls: ['./manufacturingOrderProduct.component.css'],
  providers:[]
})
export class ManufacturingOrderProductComponent implements OnInit {
  @Output() outputManufacturingOrderProducts = new EventEmitter<ManufacturingOrderProduct[]>();

  selectedManufacturingOrderProduct: ManufacturingOrderProduct;
  manufacturingOrderProducts: ManufacturingOrderProduct[] = [];

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() : void{
  }

  addManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct): void {
  	this.manufacturingOrderProducts.push(manufacturingOrderProduct);
  }

  setSelectedManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    this.selectedManufacturingOrderProduct = manufacturingOrderProduct;
  }

  saveManufacturingOrderProduct(manufacturingOrderProducts: ManufacturingOrderProduct[]): void{
    this.outputManufacturingOrderProducts.emit(manufacturingOrderProducts);
  }

}
