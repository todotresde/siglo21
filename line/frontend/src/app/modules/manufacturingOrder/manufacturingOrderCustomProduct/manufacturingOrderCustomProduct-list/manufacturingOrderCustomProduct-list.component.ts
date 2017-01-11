import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct';

@Component({
  selector: 'app-manufacturing-order-custom-product-list',
  templateUrl: './manufacturingOrderCustomProduct-list.component.html',
  providers:[]
})
export class ManufacturingOrderCustomProductListComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderCustomProducts: ManufacturingOrderCustomProduct[];
  @Output() outputManufacturingOrderCustomProduct = new EventEmitter<ManufacturingOrderCustomProduct>();

  manufacturingOrderCustomProducts: ManufacturingOrderCustomProduct[];
  
  constructor(private router: Router, private route: ActivatedRoute) { 
      
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputManufacturingOrderCustomProducts"].currentValue)
      this.manufacturingOrderCustomProducts = changes["inputManufacturingOrderCustomProducts"].currentValue;
    else
      this.manufacturingOrderCustomProducts = [];
  }

  remove(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
    this.manufacturingOrderCustomProducts = this.manufacturingOrderCustomProducts.filter(w => w.id !== manufacturingOrderCustomProduct.id);
  }

  edit(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
  }
}
