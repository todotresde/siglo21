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
  @Input() inputTracesToBeFinished;
  @Output() outputTraces = new EventEmitter<Trace[]>();
  
  message: Message = new Message();
  trace : Trace;
  
  constructor(private route: ActivatedRoute, private traceService: TraceService) { 
    this.trace = new Trace();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      this.message.none();
    })
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
    for (let propName in changes) {
      switch(propName){
          case "inputTrace": 
            if(changes["inputTrace"].currentValue != null)
              this.trace = changes["inputTrace"].currentValue; 
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

          this.trace = new Trace();
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
