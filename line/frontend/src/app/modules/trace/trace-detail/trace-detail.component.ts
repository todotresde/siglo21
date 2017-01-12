import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

@Component({
  selector: 'app-trace-detail',
  templateUrl: './trace-detail.component.html',
  providers:[TraceService]
})
export class TraceDetailComponent implements OnInit, OnChanges {
  @Input() inputTrace = new Trace();
  @Output() outputTrace = new EventEmitter<Trace>();
  trace : Trace;
  
  constructor(private route: ActivatedRoute, private traceService: TraceService) { 
    this.trace = new Trace();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.traceService.get(params["id"]).then(trace =>{ 
          this.trace = trace;
        });
      }
    });
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputTrace"].currentValue)
      this.trace = changes["inputTrace"].currentValue;
    else
      this.inputTrace = new Trace();
  }

  save(): void {
    this.traceService
        .save(this.trace)
        .then(trace => {
          this.trace = trace; 

          this.outputTrace.emit(this.trace);
        }).catch(error => {
          
        })
  }


}
