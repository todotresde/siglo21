import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrder } from '../manufacturingOrder';
import { ManufacturingOrderService } from '../manufacturingOrder.service';

@Component({
  selector: 'app-manufacturing-order-list',
  templateUrl: './manufacturingOrder-list.component.html',
  styleUrls: ['./manufacturingOrder-list.component.css'],
  providers:[ManufacturingOrderService]
})
export class ManufacturingOrderListComponent implements OnInit {
  manufacturingOrders: ManufacturingOrder[];
  messageType: number = 0;
  message: string = "";

  constructor(private router: Router, private manufacturingOrderService: ManufacturingOrderService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.manufacturingOrderService
      .getAll()
      .then(manufacturingOrders => { this.messageType = 0; this.manufacturingOrders = manufacturingOrders})
      .catch(error => { this.messageType = 4;});
  }

  create(): void {
    this.router.navigate(['../manufacturingOrder'],{ relativeTo: this.r });
  }

  edit(manufacturingOrder: ManufacturingOrder): void {
    this.router.navigate(['../manufacturingOrder', manufacturingOrder.id],{ relativeTo: this.r });
  }

  remove(manufacturingOrder: ManufacturingOrder): void {
    this.manufacturingOrderService
      .remove(manufacturingOrder)
      .then(manufacturingOrder => { this.messageType = 1; this.manufacturingOrders = this.manufacturingOrders.filter(u => u.id !== manufacturingOrder.id)})
      .catch(error => { this.messageType = 4;});
  }

  send(manufacturingOrder: ManufacturingOrder): void {
    this.manufacturingOrderService
      .send(manufacturingOrder.id)
      .catch(error => { this.messageType = 4;});

  }

}
