import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  styleUrls: ['./trace-list.component.css'],
  providers:[TraceService]
})
export class TraceListComponent implements OnInit {
  traces: Trace[];

  constructor(private router: Router, private traceService: TraceService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.traceService.getAll().then(traces => this.traces = traces);
  }

  create(): void {
    this.router.navigate(['../trace'],{ relativeTo: this.r });
  }

  edit(trace: Trace): void {
    this.router.navigate(['../trace', trace.id],{ relativeTo: this.r });
  }

  remove(trace: Trace): void {
    this.traceService.remove(trace).then(trace => this.traces = this.traces.filter(u => u.id !== trace.id));
  }

}
