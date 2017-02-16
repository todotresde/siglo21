import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line, LineService } from 'app/modules/line';

import { WorkStation } from 'app/modules/workStation/workStation';
import { TraceService } from 'app/modules/trace/trace.service';

import { Message, SortPipe } from 'app/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers:[LineService, TraceService]
})
export class DashboardComponent implements OnInit {
  lines: Line[] = [];
  message: Message = new Message();
  averages: any = {};
  sortPipe: SortPipe = new SortPipe();
  
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
    return this.sortPipe.transform((new Line(line)).getWorkStations(),"name");
  }

  private setAverage(line: Line, workStation: WorkStation): void{
    this.traceService.getAverageByLineAndWorkStation(line.id, workStation.id)
      .then(result => {
        this.averages[line.id + '' + workStation.id] = result;
      });
  }


}
