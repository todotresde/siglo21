import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Delay } from 'app/modules/delay';
import { Trace } from '../trace';
import { TraceService } from '../trace.service';
import { WorkStationConfiguration, WorkStationConfigurationService } from 'app/modules/line';

import { Message, Commons, SessionService } from 'app/shared';

@Component({
  selector: 'app-workStation-delay',
  templateUrl: './workStation-delay.component.html',
  providers:[TraceService, WorkStationConfigurationService]
})
export class WorkStationDelayComponent implements OnInit, OnChanges {
  
  message: Message = new Message();
  selectedDelay : Delay;
  
  lineId: number;
  workStationId: number;

  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService, private traceService: TraceService, private workStationConfigurationService: WorkStationConfigurationService) { 
    this.selectedDelay = new Delay();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      this.lineId = params["lineId"];
      this.workStationId = params["workStationId"];
    })
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    
  }

  updateDelays(delay: Delay): void {
    this.route.params.subscribe(params => {
      this.traceService.getAllByLineAndWorkStationAndStatus(this.lineId, this.workStationId, 1)
        .then(traces => {
          traces.map(trace => trace.delays.push(delay));

          this.saveWorkStationConfiguration(delay);
          this.saveTraces(traces);
        })
        .catch(error => { 
          this.message.error(JSON.parse(error._body).message);
        });    
    });
  }

  private saveWorkStationConfiguration(delay: Delay): void{
    this.workStationConfigurationService.getByLineAndWorkStation(this.lineId, this.workStationId)
      .then(workStationConfiguration => {
          workStationConfiguration.delays.push(delay);

          this.workStationConfigurationService
            .save(workStationConfiguration)
        })
        .catch(error => { 
          this.message.error(JSON.parse(error._body).message);
        });    
  }

  private saveTraces(traces: Trace[]): void{
    this.traceService
        .multipleSave(traces)
        .then(trace => {
          this.message.success("");

          Commons.delay().then(() => {
            this.location.back();
          });
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
