import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ManufacturingOrder } from '../manufacturingOrder';
import { ManufacturingOrderService } from '../manufacturingOrder.service';
import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';
import { Line } from '../../line/line';
import { LineService } from '../../line/line.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';
import { SessionService } from '../../../shared/session.service';

@Component({
  selector: 'app-manufacturing-order-detail',
  templateUrl: './manufacturingOrder-detail.component.html',
  providers: [LineService]
})
export class ManufacturingOrderDetailComponent implements OnInit {
  message : Message = new Message();
  manufacturingOrder : ManufacturingOrder = new ManufacturingOrder();
  selectedManufacturingOrderCustomProduct: ManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
  lines: Line[] = [];

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private manufacturingOrderService: ManufacturingOrderService, private sessionService: SessionService, private lineService: LineService) { 
    this.manufacturingOrder = new ManufacturingOrder();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(this.sessionService.has("manufacturingOrder")){
        this.manufacturingOrder = this.sessionService.get("manufacturingOrder");
      }else if(params["id"] && params["id"] != 0){
        this.manufacturingOrderService.get(params["id"])
          .then(manufacturingOrder =>{ 
            this.manufacturingOrder = manufacturingOrder;
            this.sessionService.set("manufacturingOrder", this.manufacturingOrder);
          })
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          });
      }else{
        this.sessionService.set("manufacturingOrder", this.manufacturingOrder);
      }
    });

    this.lineService
      .getAll()
      .then(lines => {this.lines = lines})
  }

  save(manufacturingOrder: ManufacturingOrder): void {
    if(this.valid(manufacturingOrder)){
      this.manufacturingOrderService
          .save(manufacturingOrder)
          .then(mO => {
            //this.manufacturingOrder = manufacturingOrder; 
            this.message.success("");

            Commons.delay().then(() => {
              this.location.back();
            });
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
