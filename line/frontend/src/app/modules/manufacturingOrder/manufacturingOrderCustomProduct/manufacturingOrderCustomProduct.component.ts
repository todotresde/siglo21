import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct/manufacturingOrderProduct';

@Component({
  selector: 'app-manufacturing-order-custom-product',
  templateUrl: './manufacturingOrderCustomProduct.component.html',
  providers:[]
})
export class ManufacturingOrderCustomProductComponent implements OnInit {
  @Output() outputManufacturingOrderCustomProduct = new EventEmitter<ManufacturingOrderCustomProduct>();

  selectedManufacturingOrderCustomProduct: ManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  manufacturingOrderCustomProducts: ManufacturingOrderCustomProduct[] = [];
  selectedManufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();

  constructor(private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit() : void{
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
  	this.manufacturingOrderCustomProducts.push(manufacturingOrderCustomProduct);
  }

  setSelectedManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    this.selectedManufacturingOrderProduct = manufacturingOrderProduct;
  }

  setSelectedManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct) : void{
    this.selectedManufacturingOrderCustomProduct = manufacturingOrderCustomProduct;
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
}
