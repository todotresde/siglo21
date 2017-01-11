import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line';
import { LineService } from '../line.service';
import { WorkStationConfiguration } from '../workStationConfiguration/workStationConfiguration';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  providers:[LineService]
})
export class LineDetailComponent implements OnInit {
  line : Line;
  
  constructor(private route: ActivatedRoute, private lineService: LineService) { 
    this.line = new Line();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.lineService.get(params["id"]).then(line =>{ 
          this.line = line;
        });
      }
    });
  }

  save(): void {
    this.lineService
        .save(this.line)
        .then(line => {
          this.line = line; 

          
          this.goBack();
        }).catch(error => {
          
        })
  }

  addWorkStationConfigurations(workStationConfigurations: WorkStationConfiguration[]): void{
    this.line.workStationConfigurations = workStationConfigurations;
  }

  goBack(): void {
    window.history.back();
  }

}
