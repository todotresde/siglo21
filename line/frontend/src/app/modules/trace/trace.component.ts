import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trace } from './trace';
import { Line } from '../line/line';
import { WorkStation } from '../workStation/workStation';

import { LineService } from '../line/line.service';
import { WorkStationService } from '../workStation/workStation.service';

import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-module-trace',
  templateUrl: './trace.component.html',
  providers: [LineService, WorkStationService]
})
export class TraceComponent implements OnInit{
	line: Line = new Line();
	workStation: WorkStation = new WorkStation();
	selectedTrace: Trace = new Trace();

	message: Message = new Message();

	constructor(private route: ActivatedRoute, private lineService: LineService, private workStationService: WorkStationService){

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
	      }
	    });
	    
	}

	activeTrace(trace: Trace): void{
		this.selectedTrace = trace;
	}
}
