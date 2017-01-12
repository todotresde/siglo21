import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  providers:[TraceService]
})
export class TraceListComponent implements OnInit, OnChanges {
  @Input() inputTraces = new Trace();
  @Output() outputTrace = new EventEmitter<Trace>();

  traces: Trace[];

  constructor(private router: Router, private traceService: TraceService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.traceService.getAll().then(traces => this.traces = traces);
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
  }

  activate(trace: Trace): void {
    this.outputTrace.emit(trace);
  }

}
