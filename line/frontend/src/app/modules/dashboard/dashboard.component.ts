import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line/line';
import { LineService } from '../line/line.service';
import { WorkStation } from '../workStation/workStation';
import { TraceService } from '../trace/trace.service';

import { Message } from '../../shared/message/message';
import { Commons } from '../../shared/commons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers:[LineService, TraceService]
})
export class DashboardComponent implements OnInit {
  lines: Line[] = [];
  message: Message = new Message();
  averages: any = {};
  
  constructor(private route: ActivatedRoute, private lineService: LineService, private traceService: TraceService) { 
 
  }

  ngOnInit() : void{
    this.lineService
      .getAll()
      .then(lines => {
        lines.forEach(line => {
          let workStations = this.getWorkStations(line);

          workStations.forEach(workStation => this.setAverage(line, workStation));
        })

        this.lines = lines;
      })
  }

  getWorkStations(line: Line): WorkStation[]{
    return (new Line(line)).getWorkStations();
  }

  private setAverage(line: Line, workStation: WorkStation): void{
    this.traceService.getAverageByLineAndWorkStation(line.id, workStation.id)
      .then(average => this.averages[line.id + '' + workStation.id] = Math.round(average));

  }

}
