import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Commons } from '../../../shared/commons';

import { ManufacturingOrder } from '../manufacturingOrder';
import { ManufacturingOrderService } from '../manufacturingOrder.service';
import { Delay } from '../../delay/delay';

import { Line } from '../../line/line';
import { LineService } from '../../line/line.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-manufacturing-order-query',
  templateUrl: './manufacturingOrderQuery.component.html',
  providers:[ManufacturingOrderService, LineService]
})
export class ManufacturingOrderQueryComponent implements OnInit {
  lines: Line[] = [];
  message : Message = new Message();
  manufacturingOrders: ManufacturingOrder[];
  time : any;
  manufacturingOrderCode : "";
  traceCode : "";
  selectedLine : Line;

  constructor(private router: Router, private manufacturingOrderService: ManufacturingOrderService, private r:ActivatedRoute, private lineService: LineService) {

  }

  ngOnInit(): void{
    let today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);

	let tomorrow = new Date(today.getTime());
	tomorrow.setDate(today.getDate() + 1);

	this.time = Delay.newDelayTime(today, today, tomorrow, tomorrow);

	this.lineService
      .getAll()
      .then(lines => {this.lines = lines})
  }

  search(time: any, line: Line, manufacturingOrderCode: string, traceCode: string): void{
    this.manufacturingOrders = [];
    
    this.manufacturingOrderService.search(
      Commons.convertDateStringToDate(time.startDate),
      Commons.convertDateStringToDate(time.endDate),
      (line ? line.id : 0),
      (manufacturingOrderCode ? manufacturingOrderCode : "0"),
      (traceCode ? traceCode : "0"))
      .then(manufacturingOrders => { this.manufacturingOrders = manufacturingOrders})
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

  select(manufacturingOrder: ManufacturingOrder): void{
    this.router.navigate(['../manufacturingOrderQuery/', manufacturingOrder.id],{ relativeTo: this.r });
  }
}
