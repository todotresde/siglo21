import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Commons } from '../../../../shared/commons';
import { SortPipe } from '../../../../shared/sort.pipe';

import { ManufacturingOrder } from '../../manufacturingOrder';
import { ManufacturingOrderService } from '../../manufacturingOrder.service';
import { WorkStation } from '../../../workStation/workStation';
import { Delay } from '../../../delay/delay';
import { Line } from '../../../line/line';
import { LineService } from '../../../line/line.service';
import { Trace } from '../../../trace/trace';
import { TraceService } from '../../../trace/trace.service';

import { Message } from '../../../../shared/message/message';

export class DelayQuery extends Delay{
  workStation: WorkStation;

  constructor(options?: any){
    super(options);

    if(options){
      this.workStation = (options.workStation) ? options.workStation : new WorkStation();
    }
  }
}

@Component({
  selector: 'app-manufacturing-order-query-detail',
  templateUrl: './manufacturingOrderQuery-detail.component.html',
  providers:[ManufacturingOrderService, LineService, TraceService]
})
export class ManufacturingOrderQueryDetailComponent implements OnInit {
  manufacturingOrder: ManufacturingOrder = new ManufacturingOrder();
  line: Line = new Line();
  message : Message = new Message();
  date: string;
  traces: Trace[] = [];
  delays: DelayQuery[] = [];

  sortPipe: SortPipe = new SortPipe();

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private manufacturingOrderService: ManufacturingOrderService, private r:ActivatedRoute, private traceService: TraceService) {

  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.manufacturingOrderService
          .get(params["id"])
          .then(manufacturingOrder => {
            this.manufacturingOrder = manufacturingOrder;
            this.line = manufacturingOrder.line;
            this.date = Commons.convertDateToDateString(this.manufacturingOrder.date);

            this.getTraces(manufacturingOrder);
          })
      }
    })
  }

  getTraces(manufacturingOrder : ManufacturingOrder): void{
    this.traceService.getAllByManufacturingOrder(manufacturingOrder.id)
      .then(traces => {
        traces.forEach(trace => {
          trace.delays.forEach(delay => {
            let delayQuery = new DelayQuery(delay);
            delayQuery.workStation = trace.workStation;

            this.delays.push(delayQuery);
          })
        })
        debugger
        this.traces = this.sortPipe.transform(traces,"code,workStation.name");
      })
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      });
  }

  back(): void{
    this.location.back();
  }
  
}
