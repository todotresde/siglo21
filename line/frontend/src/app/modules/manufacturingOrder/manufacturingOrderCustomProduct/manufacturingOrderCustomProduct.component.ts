import { Component, OnInit , EventEmitter, Input, Output, SimpleChange, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrder } from '../manufacturingOrder'
import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct/manufacturingOrderProduct';

import { Message, SessionService } from 'app/shared';

@Component({
  selector: 'app-manufacturing-order-custom-product',
  templateUrl: './manufacturingOrderCustomProduct.component.html',
  providers:[]
})
export class ManufacturingOrderCustomProductComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  @Output() outputManufacturingOrderCustomProduct = new EventEmitter<ManufacturingOrderCustomProduct>();

  message: Message = new Message();

  selectedManufacturingOrderCustomProduct: ManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  manufacturingOrderCustomProducts: ManufacturingOrderCustomProduct[] = [];
  selectedManufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();
  manufacturingOrder: ManufacturingOrder = new ManufacturingOrder();

  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService) { 
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"] && params["id"] != 0){
        if(this.sessionService.has("manufacturingOrder")){
          this.manufacturingOrder = new ManufacturingOrder(this.sessionService.get("manufacturingOrder"));
          this.selectedManufacturingOrderCustomProduct = this.manufacturingOrder.getManufacturingOrderCustomProduct(params["id"]);
        }else{
          this.message.error("error-missing-manufacturing-order");
        }
      }
    });
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
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
    this.selectedManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  }
  /*
  saveManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct){
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
    this.newManufacturingOrderProduct();
  }
  */
  addManufacturingOrderProduct(manufacturingOrderProduct : ManufacturingOrderProduct): void {
    //this.selectedManufacturingOrderCustomProduct.addManufacturingOrderProduct(manufacturingOrderProduct);
    this.selectedManufacturingOrderCustomProduct.manufacturingOrderProducts.push(manufacturingOrderProduct);
  }

  /*
  newManufacturingOrderProduct(): void {
    this.selectedManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  }
  */

  setSelectedManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    this.selectedManufacturingOrderProduct = manufacturingOrderProduct;
  }
}
