import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-trace-detail',
  templateUrl: './trace-detail.component.html',
  providers:[TraceService]
})
export class TraceDetailComponent implements OnInit, OnChanges {
  @Input() inputTrace = new Trace();
  @Output() outputTrace = new EventEmitter<Trace>();
  
  message: Message = new Message();
  trace : Trace;
  
  constructor(private route: ActivatedRoute, private traceService: TraceService) { 
    this.trace = new Trace();
  }

  ngOnInit() : void{

  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputTrace"].currentValue)
      this.trace = changes["inputTrace"].currentValue;
    else
      this.inputTrace = new Trace();
  }

  finish(trace: Trace): void {
    this.traceService
        .finish(trace)
        .then(trace => {
          this.message.success("work-finished");

          this.outputTrace.emit(trace);

          this.trace = new Trace();
        }).catch(error => {
          
        })
  }


}
