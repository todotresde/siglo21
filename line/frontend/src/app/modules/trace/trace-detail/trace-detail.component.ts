import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

import { Message, Commons } from 'app/shared';

@Component({
  selector: 'app-trace-detail',
  templateUrl: './trace-detail.component.html',
  providers:[TraceService]
})
export class TraceDetailComponent implements OnInit, OnChanges {
  @Input() inputTraces;
  @Input() inputTracesToBeFinished;
  @Output() outputTraces = new EventEmitter<Trace[]>();
  
  message: Message = new Message();
  traces : Trace[];
  
  constructor(private route: ActivatedRoute, private traceService: TraceService) { 
    this.traces = [];
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      this.message.none();
    })
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
    for (let propName in changes) {
      switch(propName){
          case "inputTraces": 
            if(changes["inputTraces"].currentValue != null)
              this.traces = this.setStartTime(changes["inputTraces"].currentValue);
            break;
          case "inputTracesToBeFinished": 
            if(changes["inputTracesToBeFinished"].currentValue != null)
              this.finish(changes["inputTracesToBeFinished"].currentValue); 
            break;
      }
    }
  }

  finish(traces: Trace[]): void {
    this.traceService
        .finish(traces)
        .then(ts => {
          this.message.success("work-finished");

          this.outputTraces.emit(traces);

          this.traces = [];
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

  private setStartTime(traces: Trace[]): Trace[]{
    traces.forEach(trace => {
      trace.startTime = new Date();
    })

    return traces;
  }

}
