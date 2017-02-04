import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Delay } from '../../delay/delay';
import { Trace } from '../trace';
import { TraceService } from '../trace.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';
import { SessionService } from '../../../shared/session.service';

@Component({
  selector: 'app-workStation-delay',
  templateUrl: './workStation-delay.component.html',
  providers:[TraceService]
})
export class WorkStationDelayComponent implements OnInit, OnChanges {
  
  message: Message = new Message();
  selectedDelay : Delay;
  
  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService, private traceService: TraceService) { 
    this.selectedDelay = new Delay();
  }

  ngOnInit() : void{
    
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
  }

  updateDelays(delay: Delay): void {
    this.route.params.subscribe(params => {
      this.traceService.getAllByLineAndWorkStationAndStatus(params["lineId"], params["workStationId"], 1)
        .then(traces => {
          traces.map(trace => trace.delays.push(delay));

          this.saveTraces(traces);
        })
        .catch(error => { 
          this.message.error(JSON.parse(error._body).message);
        });    
    });
  }

  private saveTraces(traces: Trace[]): void{
    this.traceService
        .multipleSave(traces)
        .then(trace => {
          this.message.success("success-delay-addedd");

          Commons.delay().then(() => {
            this.location.back();
          });
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
