import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

import { Message } from '../../../shared/message/message';
import { SessionService } from '../../../shared/session.service';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  providers:[TraceService]
})
export class TraceListComponent implements OnInit, OnChanges {
  @Input() inputTrace = new Trace();
  @Input() inputTraces = new Trace();
  @Output() outputTrace = new EventEmitter<Trace>();
  @Output() outputFinishTrace = new EventEmitter<Trace>();

  message: Message = new Message();
  traces: Trace[];
  code: String = "";

  constructor(private route: ActivatedRoute, private router: Router, private traceService: TraceService, private r:ActivatedRoute, private sessionService: SessionService) {

  }

  ngOnInit(): void{
    this.load();
    
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputTrace": if(changes["inputTrace"].currentValue){this.load();} break;
          case "inputTraces": if(changes["inputTraces"].currentValue){this.traces = changes["inputTraces"].currentValue;} break;
      }
    }
  }

  activate(trace: Trace): void {
    this.outputTrace.emit(trace);
  }

  selectByCode(code: String): void{
    let trace: Trace;

    this.traces.forEach(t => {
      if(t.code == code){
        trace = t;
      }
    });
    
    if(trace != null)
      this.outputFinishTrace.emit(trace);
  }

  delay(trace: Trace): void{
    this.sessionService.set("traceDelay", trace);
    this.router.navigate(['./traceDelay', trace.id],{ relativeTo: this.r });
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
