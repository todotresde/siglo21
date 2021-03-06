import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

import { Message, Commons, SessionService } from 'app/shared';

export class TraceGroupByCode {
  code: String;
  traces: Trace[];

  constructor(code: String, traces: Trace[]){
    this.code = code;
    this.traces = traces;
  }
}

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  providers:[TraceService]
})
export class TraceListComponent implements OnInit, OnChanges {
  @Input() reload: any;
  @Input() inputTraces = new Trace();
  @Output() outputTraces = new EventEmitter<Trace[]>();
  @Output() outputFinishTraces = new EventEmitter<Trace[]>();

  message: Message = new Message();
  
  tracesGroupByCode: TraceGroupByCode[] = [];
  code: String = "";


  constructor(private route: ActivatedRoute, private router: Router, private traceService: TraceService, private r:ActivatedRoute, private sessionService: SessionService) {

  }

  ngOnInit(): void{
    this.load();
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {

    for (let propName in changes) {
      switch(propName){
          case "reload": if(changes["reload"].currentValue){this.load();} break;
          //case "inputTraces": if(changes["inputTraces"].currentValue){this.joinTracesByManufacturingOrderCustomProduct(changes["inputTraces"].currentValue);} break;
      }
    }
  }

  activate(traceGroupByCode: TraceGroupByCode): void {
    this.outputTraces.emit(traceGroupByCode.traces);
  }

  selectByCode(code: String): void{
    let traces: Trace[] = [];

    this.tracesGroupByCode.forEach(traceGroupByCode => {
      if(traceGroupByCode.code == code){
        traces = traceGroupByCode.traces;
      }
    });
    
    if(traces != null)
      this.outputFinishTraces.emit(traces);
  }

  delay(traceGroupByCode: TraceGroupByCode): void{
    this.sessionService.set("tracesDelay", traceGroupByCode.traces);
    this.router.navigate(['./tracesDelay'],{ relativeTo: this.r });
  }

  private load(): void{
    this.route.params.subscribe(params => {
      this.code = "";

      if(params["lineId"] && params["workStationId"]){
        this.traceService.getAllByLineAndWorkStationAndStatus(params["lineId"], params["workStationId"], 1)
          .then(traces => {
            this.joinTracesByManufacturingOrderCustomProduct(traces);
          })
          .catch(error => { 
            this.message.error(JSON.parse(error._body).message);
          });
      }
    });
  }

  private joinTracesByManufacturingOrderCustomProduct(traces: Trace[]){
    this.tracesGroupByCode = [];
            
    traces.forEach(trace => {
      let found = false;

      this.tracesGroupByCode.forEach(traceGroupByCode => {
        if(traceGroupByCode.code == trace.code && !found){
          traceGroupByCode.traces.push(trace);
          found = true;
        }
      })
      
      if(!found){
        let traceGroupByCode = new TraceGroupByCode(trace.code, [trace]);
        this.tracesGroupByCode.push(traceGroupByCode);
      }
    }, this);

  }

}
