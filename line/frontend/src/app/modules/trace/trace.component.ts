import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from './trace';
import { TraceService } from './trace.service';
import { Line } from '../line/line';
import { WorkStation } from '../workStation/workStation';

import { LineService } from '../line/line.service';
import { WorkStationService } from '../workStation/workStation.service';

import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-module-trace',
  templateUrl: './trace.component.html',
  providers: [LineService, WorkStationService, TraceService]
})
export class TraceComponent implements OnInit, OnChanges{
	line: Line = new Line();
	workStation: WorkStation = new WorkStation();
	selectedTrace: Trace;
	selectedTraceToBeFinished: Trace;
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
	    		.then(average => this.average = Math.round(average));
	      }
	    });

	}

	ngOnChanges(changes:  {[propKey: string]: SimpleChange}): void{
	}

	activeTrace(trace: Trace): void{
		this.selectedTrace = trace;
	}

	finishTrace(trace: Trace): void{
		this.selectedTraceToBeFinished = trace;
	}

	workStationDelay(line: Line, workStation: WorkStation): void{
		this.router.navigate(['./workStationDelay'],{ relativeTo: this.r });
	}

	
}
