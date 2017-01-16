import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrderProduct } from '../../manufacturingOrderProduct/manufacturingOrderProduct'
import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct'

import { Message } from '../../../../shared/message/message';

@Component({
  selector: 'app-manufacturing-order-custom-product-detail',
  templateUrl: './manufacturingOrderCustomProduct-detail.component.html',
  providers:[]
})
export class ManufacturingOrderCustomProductDetailComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  @Output() outputManufacturingOrderCustomProduct = new EventEmitter<ManufacturingOrderCustomProduct>();
  @Output() outputManufacturingOrderProduct = new EventEmitter<ManufacturingOrderProduct>();

  message: Message = new Message();
  manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct;
  
  constructor(private route: ActivatedRoute) { 
      this.manufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputManufacturingOrderCustomProduct": this.manufacturingOrderCustomProduct = changes["inputManufacturingOrderCustomProduct"].currentValue; break;
      }
    }
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void{
    if(this.validForm(this.manufacturingOrderCustomProduct)){
      this.outputManufacturingOrderCustomProduct.emit(this.manufacturingOrderCustomProduct);
      this.message.none();
    }else{
      this.message.error("error-missing-values");
    }
  }

  update(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void{
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
  }

  setSelectedManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    debugger
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
  }

  private validForm(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): boolean{
    return (
      manufacturingOrderCustomProduct.description != undefined &&
      manufacturingOrderCustomProduct.manufacturingOrderProducts.length > 0
    );
  }
}
