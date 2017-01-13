import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../workStation';
import { WorkStationService } from '../workStation.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-workStation-detail',
  templateUrl: './workStation-detail.component.html',
  providers:[WorkStationService]
})
export class WorkStationDetailComponent implements OnInit {
  message: Message = new Message();
  workStation : WorkStation;

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService) { 
    this.workStation = new WorkStation();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.workStationService.get(params["id"]).then(workStation =>{ 
          this.workStation = workStation;
        });
      }
    });
  }

  save(): void {
    this.workStationService
        .save(this.workStation)
        .then(workStation => { 
          this.workStation = workStation; 
          this.message.success("");
        })
        .catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
