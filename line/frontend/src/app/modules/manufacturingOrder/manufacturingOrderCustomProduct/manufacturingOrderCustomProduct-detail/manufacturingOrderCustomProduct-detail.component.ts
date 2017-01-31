import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ManufacturingOrder } from '../../manufacturingOrder'
import { ManufacturingOrderProduct } from '../../manufacturingOrderProduct/manufacturingOrderProduct'
import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct'

import { Message } from '../../../../shared/message/message';
import { Commons } from '../../../../shared/commons';
import { SessionService } from '../../../../shared/session.service';

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
  manufacturingOrder: ManufacturingOrder = new ManufacturingOrder();
  
  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService) { 
      this.manufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"] && params["id"] != 0){
        if(this.sessionService.has("manufacturingOrder")){
          this.manufacturingOrder = new ManufacturingOrder(this.sessionService.get("manufacturingOrder"));
          this.manufacturingOrderCustomProduct = this.manufacturingOrder.getManufacturingOrderCustomProduct(params["id"]);
        }else{
          this.message.error("error-missing-manufacturing-order");
        }
      }
    });
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputManufacturingOrderCustomProduct": this.manufacturingOrderCustomProduct = changes["inputManufacturingOrderCustomProduct"].currentValue; break;
      }
    }
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void{
    if(this.validForm(manufacturingOrderCustomProduct)){
      this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
      this.message.none();

      //this.manufacturingOrder = new ManufacturingOrder(this.sessionService.get("manufacturingOrder"));
      this.manufacturingOrder.addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct);
      this.sessionService.set("manufacturingOrder", this.manufacturingOrder);

      Commons.delay().then(() => {
        this.manufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
        this.location.back();
      });
    }else{
      this.message.error("error-missing-values");
    }
  }

  update(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void{
    this.outputManufacturingOrderCustomProduct.emit(manufacturingOrderCustomProduct);
  }

  setSelectedManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
  }

  setSelectedManufacturingOrderProducts(manufacturingOrderProducts: ManufacturingOrderProduct[]) : void{
    debugger
    this.manufacturingOrderCustomProduct.manufacturingOrderProducts = manufacturingOrderProducts;
  }

  private validForm(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): boolean{
    return (
      manufacturingOrderCustomProduct.description != undefined &&
      manufacturingOrderCustomProduct.manufacturingOrderProducts.length > 0
    );
  }
}
