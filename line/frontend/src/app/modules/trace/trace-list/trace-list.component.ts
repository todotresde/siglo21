import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  providers:[TraceService]
})
export class TraceListComponent implements OnInit, OnChanges {
  @Input() inputTrace = new Trace();
  @Input() inputTraces = new Trace();
  @Output() outputTrace = new EventEmitter<Trace>();

  message: Message = new Message();
  traces: Trace[];

  constructor(private route: ActivatedRoute, private router: Router, private traceService: TraceService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.load();
    
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputTrace": if(changes["inputTrace"].currentValue){this.load();} break;
          case "inputTraces": break;
      }
    }
  }

  activate(trace: Trace): void {
    this.outputTrace.emit(trace);
  }

  private load(): void{
    this.route.params.subscribe(params => {
      if(params["lineId"] && params["workStationId"]){
        this.traceService.getAllByLineAndWorkStationAndStatus(params["lineId"], params["workStationId"], 1)
          .then(traces => {
            this.traces = traces;
          })
          .catch(error => { 
            this.message.error(JSON.parse(error._body).message);
          });
      }
    });
  }

}
