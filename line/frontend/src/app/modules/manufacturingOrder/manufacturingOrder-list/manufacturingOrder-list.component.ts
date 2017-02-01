import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrder } from '../manufacturingOrder';
import { ManufacturingOrderService } from '../manufacturingOrder.service';

import { Message } from '../../../shared/message/message';
import { SessionService } from '../../../shared/session.service';

@Component({
  selector: 'app-manufacturing-order-list',
  templateUrl: './manufacturingOrder-list.component.html',
  providers:[ManufacturingOrderService]
})
export class ManufacturingOrderListComponent implements OnInit {
  message : Message = new Message();
  manufacturingOrders: ManufacturingOrder[];

  constructor(private router: Router, private manufacturingOrderService: ManufacturingOrderService, private r:ActivatedRoute, private sessionService: SessionService) {

  }

  ngOnInit(): void{
    this.sessionService.remove("manufacturingOrder");
    this.getAll();
  }

  create(): void {
    this.router.navigate(['../manufacturingOrder/0'],{ relativeTo: this.r });
  }

  edit(manufacturingOrder: ManufacturingOrder): void {
    this.router.navigate(['../manufacturingOrder', manufacturingOrder.id],{ relativeTo: this.r });
  }

  remove(manufacturingOrder: ManufacturingOrder): void {
    this.manufacturingOrderService
      .remove(manufacturingOrder)
      .then(manufacturingOrderId => { this.manufacturingOrders = this.manufacturingOrders.filter(u => u.id !== manufacturingOrderId)})
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

  send(manufacturingOrder: ManufacturingOrder): void {
    this.manufacturingOrderService
      .send(manufacturingOrder.id)
      .then(manufacturingOrder => {
        this.message.success("success-sending-to-production");
        this.getAll();
      })
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })

  }

  private getAll(): void{
    this.manufacturingOrderService
      .getAll()
      .then(manufacturingOrders => { this.manufacturingOrders = manufacturingOrders})
      .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          })
  }

}
