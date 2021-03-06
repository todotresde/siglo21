import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from 'app/modules/delay';
import { Trace } from './trace';
import { TraceService } from './trace.service';
import { WorkStation, WorkStationService } from 'app/modules/workStation';
import { Line, LineService } from 'app/modules/line';

import { Message } from 'app/shared';

@Component({
  selector: 'app-module-trace',
  templateUrl: './trace.component.html',
  providers: [LineService, WorkStationService, TraceService]
})
export class TraceComponent implements OnInit, OnChanges{
	line: Line = new Line();
	workStation: WorkStation = new WorkStation();
	selectedTraces: Trace[];
	selectedTracesToBeFinished: Trace[];
	average: number = 0;

	message: Message = new Message();

	constructor(private route: ActivatedRoute, private router: Router, private lineService: LineService, private workStationService: WorkStationService, private traceService: TraceService, private r:ActivatedRoute){
	}

	ngOnInit(): void{
	    this.route.params.subscribe(params => {
	      
	      if(params["lineId"] && params["workStationId"]){
	        this.lineService.get(params["lineId"])
	          .then(line => this.line = line)
	          .catch(error => { 
	            this.message.error(JSON.parse(error._body).message);
	          });

	        this.workStationService.get(params["workStationId"])
	          .then(workStation => this.workStation = workStation)
	          .catch(error => { 
	            this.message.error(JSON.parse(error._body).message);
	          });

	        this.average = 0;
	    	this.traceService.getAverageByLineAndWorkStation(params["lineId"], params["workStationId"])
	    		.then(result => this.average = Math.round(result.currentAverage));
	      }
	    });

	}

	ngOnChanges(changes:  {[propKey: string]: SimpleChange}): void{
	}

	activeTraces(traces: Trace[]): void{
		this.selectedTraces = traces;
	}

	finishTraces(traces: Trace[]): void{
		this.selectedTracesToBeFinished = traces;
	}

	workStationDelay(line: Line, workStation: WorkStation): void{
		this.router.navigate(['./workStationDelay'],{ relativeTo: this.r });
	}

	
}
