import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderProduct } from '../manufacturingOrderProduct';

@Component({
  selector: 'app-manufacturing-order-product-list',
  templateUrl: './manufacturingOrderProduct-list.component.html',
  providers:[]
})
export class ManufacturingOrderProductListComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderProducts: ManufacturingOrderProduct[];
  @Output() outputManufacturingOrderProduct = new EventEmitter<ManufacturingOrderProduct>();
  @Output() outputManufacturingOrderProducts = new EventEmitter<ManufacturingOrderProduct[]>();

  manufacturingOrderProducts: ManufacturingOrderProduct[];
  
  constructor(private router: Router, private route: ActivatedRoute) { 
      
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputManufacturingOrderProducts"].currentValue)
      this.manufacturingOrderProducts = changes["inputManufacturingOrderProducts"].currentValue;
    else
      this.manufacturingOrderProducts = [];
  }

  remove(manufacturingOrderProduct: ManufacturingOrderProduct): void {
    debugger
    this.manufacturingOrderProducts = this.manufacturingOrderProducts.filter(w => w.id !== manufacturingOrderProduct.id);
    this.outputManufacturingOrderProducts.emit(this.manufacturingOrderProducts);
  }

  edit(manufacturingOrderProduct: ManufacturingOrderProduct): void {
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
  }
}
