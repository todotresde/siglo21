import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrder } from '../manufacturingOrder';
import { ManufacturingOrderService } from '../manufacturingOrder.service';
import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-manufacturing-order-detail',
  templateUrl: './manufacturingOrder-detail.component.html',
  providers:[ManufacturingOrderService]
})
export class ManufacturingOrderDetailComponent implements OnInit {
  message : Message = new Message();
  manufacturingOrder : ManufacturingOrder;
  selectedManufacturingOrderCustomProduct: ManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  
  constructor(private router: Router, private route: ActivatedRoute, private manufacturingOrderService: ManufacturingOrderService) { 
    this.manufacturingOrder = new ManufacturingOrder();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.manufacturingOrderService.get(params["id"])
          .then(manufacturingOrder =>{ this.manufacturingOrder = manufacturingOrder;})
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          })
      }
    });
  }

  save(manufacturingOrder: ManufacturingOrder): void {
    if(this.valid(this.manufacturingOrder)){
      this.manufacturingOrderService
          .save(manufacturingOrder)
          .then(manufacturingOrder => {
            this.manufacturingOrder = manufacturingOrder; 
            this.message.none();
          }).catch(error => {
            this.message.error(JSON.parse(error._body).message);
          });
    }else{
      this.message.error("error-missing-values");
    }
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
    this.manufacturingOrder.addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct);
  }

  setSelectedManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void{
    this.selectedManufacturingOrderCustomProduct = manufacturingOrderCustomProduct;
  }

  newManufacturingOrderCustomProduct(): void {
    this.manufacturingOrder = new ManufacturingOrder();
  }

  private valid(manufacturingOrder: ManufacturingOrder): boolean{
    return (manufacturingOrder.manufacturingOrderCustomProducts.length > 0 && manufacturingOrder.code != undefined);
  }

}
