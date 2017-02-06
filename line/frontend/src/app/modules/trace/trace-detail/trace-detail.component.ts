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
  @Input() inputTrace;
  @Input() inputTraceToBeFinished;
  @Output() outputTrace = new EventEmitter<Trace>();
  
  message: Message = new Message();
  trace : Trace;
  
  constructor(private route: ActivatedRoute, private traceService: TraceService) { 
    this.trace = new Trace();
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    this.message.none();
    
    for (let propName in changes) {
      switch(propName){
          case "inputTrace": 
            if(changes["inputTrace"].currentValue != null)
              this.trace = changes["inputTrace"].currentValue; 
            break;
          case "inputTraceToBeFinished": 
            if(changes["inputTraceToBeFinished"].currentValue != null)
              this.finish(changes["inputTraceToBeFinished"].currentValue); 
            break;
      }
    }
  }

  finish(trace: Trace): void {
    this.traceService
        .finish(trace)
        .then(trace => {
          this.message.success("work-finished");

          this.outputTrace.emit(trace);

          this.trace = new Trace();
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
