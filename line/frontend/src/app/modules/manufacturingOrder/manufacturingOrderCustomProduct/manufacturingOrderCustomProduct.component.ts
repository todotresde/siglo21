import { Component, OnInit , EventEmitter, Input, Output, SimpleChange, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct/manufacturingOrderProduct';

@Component({
  selector: 'app-manufacturing-order-custom-product',
  templateUrl: './manufacturingOrderCustomProduct.component.html',
  providers:[]
})
export class ManufacturingOrderCustomProductComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  @Output() outputManufacturingOrderCustomProduct = new EventEmitter<ManufacturingOrderCustomProduct>();

  selectedManufacturingOrderCustomProduct: ManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  manufacturingOrderCustomProducts: ManufacturingOrderCustomProduct[] = [];
  selectedManufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();

  constructor(private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputManufacturingOrderCustomProduct": this.selectedManufacturingOrderCustomProduct = changes["inputManufacturingOrderCustomProduct"].currentValue; break;
      }
    }
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
  	this.manufacturingOrderCustomProducts.push(manufacturingOrderCustomProduct);
  }

  setSelectedManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct) : void{
    this.selectedManufacturingOrderCustomProduct = manufacturingOrderCustomProduct;
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
  }

  saveManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct){
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
    this.newManufacturingOrderProduct();
  }

  addManufacturingOrderProduct(manufacturingOrderProduct : ManufacturingOrderProduct): void {
    this.selectedManufacturingOrderCustomProduct.addManufacturingOrderProduct(manufacturingOrderProduct);
  }

  newManufacturingOrderProduct(): void {
    this.selectedManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  }

  setSelectedManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    this.selectedManufacturingOrderProduct = manufacturingOrderProduct;
  }
}
