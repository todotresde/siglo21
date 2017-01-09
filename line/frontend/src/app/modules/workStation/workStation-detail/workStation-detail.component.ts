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

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService) { 
    this.workStation = new WorkStation(-1,"-1","0.0.0.0");
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
          
          this.goBack();
        }).catch(error => {
        })
  }

  goBack(): void {
    window.history.back();
  }

}
