import { Component, OnInit, OnChanges, SimpleChange, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderProduct } from './manufacturingOrderProduct';

@Component({
  selector: 'app-manufacturing-order-product',
  templateUrl: './manufacturingOrderProduct.component.html',
  styleUrls: ['./manufacturingOrderProduct.component.css'],
  providers:[]
})
export class ManufacturingOrderProductComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();
  @Output() outputManufacturingOrderProduct = new EventEmitter<ManufacturingOrderProduct>();

  manufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputManufacturingOrderProduct"].currentValue)
      this.manufacturingOrderProduct = changes["inputManufacturingOrderProduct"].currentValue;
    else
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

  setManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    this.manufacturingOrderProduct = manufacturingOrderProduct;
  }

  saveManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct): void{
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
    this.manufacturingOrderProduct = new ManufacturingOrderProduct();
  }

}
