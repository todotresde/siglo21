import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Line } from '../line';
import { LineService } from '../line.service';
import { WorkStationConfiguration } from '../workStationConfiguration/workStationConfiguration';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  providers:[LineService]
})
export class LineDetailComponent implements OnInit {
  message: Message = new Message();
  line : Line;
  
  constructor(private location: Location, private route: ActivatedRoute, private lineService: LineService) { 
    this.line = new Line();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.lineService.get(params["id"])
          .then(line =>{ 
            this.line = line;
          })
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          })
      }
    });
  }

  save(): void {
    this.lineService
        .save(this.line)
        .then(line => {
          
          this.message.success("");
          
          Commons.delay().then(() => {
            this.back();
          });
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        });
  }

  addWorkStationConfigurations(workStationConfigurations: WorkStationConfiguration[]): void{
    this.line.workStationConfigurations = workStationConfigurations;
  }

  back(): void{
    this.location.back();
  }

}
