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

  constructor(private router: Router, private manufacturingOrderService: ManufacturingOrderService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.manufacturingOrderService.getManufacturingOrders().then(manufacturingOrders => this.manufacturingOrders = manufacturingOrders);
  }

  create(): void {
    this.router.navigate(['../manufacturingOrder'],{ relativeTo: this.r });
  }

  edit(manufacturingOrder: ManufacturingOrder): void {
    this.router.navigate(['../manufacturingOrder', manufacturingOrder.id],{ relativeTo: this.r });
  }

  remove(manufacturingOrder: ManufacturingOrder): void {
    this.manufacturingOrderService.removeManufacturingOrder(manufacturingOrder).then(manufacturingOrder => this.manufacturingOrders = this.manufacturingOrders.filter(u => u.id !== manufacturingOrder.id));
  }

}
