import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../workStation';
import { WorkStationService } from '../workStation.service';

@Component({
  selector: 'app-workStation-detail',
  templateUrl: './workStation-detail.component.html',
  styleUrls: ['./workStation-detail.component.css'],
  providers:[WorkStationService]
})
export class WorkStationDetailComponent implements OnInit {

  workStation : WorkStation;
  messageType : Number = 0;
  message : String = "";

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService) { 
    this.workStation = new WorkStation();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.workStationService.getWorkStation(params["id"]).then(workStation =>{ 
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

          //this.messageType = MESSAGE_TYPE.Success;
          this.message = "save-success";
          
          this.goBack();
        }).catch(error => {
          //this.messageType = MESSAGE_TYPE.Error;
          this.message = error;
        })
  }

  goBack(): void {
    window.history.back();
  }

}
