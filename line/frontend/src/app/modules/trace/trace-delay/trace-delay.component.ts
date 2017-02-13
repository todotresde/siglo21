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
  selector: 'app-trace-delay',
  templateUrl: './trace-delay.component.html',
  providers:[TraceService]
})
export class TraceDelayComponent implements OnInit, OnChanges {
  
  traces: Trace[];
  message: Message = new Message();
  selectedDelay : Delay;
  
  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService, private traceService: TraceService) { 
    this.selectedDelay = new Delay();
  }

  ngOnInit() : void{
    this.traces = this.sessionService.get("tracesDelay");
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
  }

  updateDelays(delay: Delay): void {
    this.traces.forEach(trace => {
      trace.delays.push(delay);
    });

    this.traceService
        .multipleSave(this.traces)
        .then(trace => {
          this.message.success("");

          Commons.delay().then(() => {
            this.location.back();
          });
        }).catch(error => {
          
        })
  }

}
