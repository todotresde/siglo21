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
  
  trace: Trace;
  message: Message = new Message();
  selectedDelay : Delay;
  
  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService, private traceService: TraceService) { 
    this.selectedDelay = new Delay();
  }

  ngOnInit() : void{
    this.trace = this.sessionService.get("traceDelay");
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
  }

  updateDelays(delay: Delay): void {
    this.trace.delays.push(delay);

    this.traceService
        .save(this.trace)
        .then(trace => {
          this.message.success("success-delay-addedd");

          Commons.delay().then(() => {
            this.location.back();
          });
        }).catch(error => {
          
        })

    
  }

}
