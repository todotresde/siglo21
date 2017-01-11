import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from '../trace';
import { TraceService } from '../trace.service';

@Component({
  selector: 'app-trace-detail',
  templateUrl: './trace-detail.component.html',
  styleUrls: ['./trace-detail.component.css'],
  providers:[TraceService]
})
export class TraceDetailComponent implements OnInit {
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

  save(): void {
    this.traceService
        .save(this.trace)
        .then(trace => {
          this.trace = trace; 

        }).catch(error => {
          
        })
  }


}
