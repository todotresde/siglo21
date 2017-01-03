import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../../../workStation/workStation';
import { WorkStationService } from '../../../workStation/workStation.service';
import { WorkStationProductTypes } from './workStationProductTypes';
import { WorkStationProductTypesService } from './workStationProductTypes.service';

@Component({
  selector: 'app-workstation-users',
  templateUrl: './workStationProductTypes.component.html',
  styleUrls: ['./workStationProductTypes.component.css'],
  providers:[WorkStationService, WorkStationProductTypesService]
})
export class WorkStationProductTypesComponent implements OnInit {

  message : String = "";
  
  workStations : WorkStation[];
  workStationProductTypes: WorkStationProductTypes;
  
  prevWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");
  currentWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");
  nextWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService, private workStationProductTypesService: WorkStationProductTypesService) { 
      
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.workStationProductTypesService.getWorkStationProductTypes(params["id"]).then(workStationProductTypes =>{ 
          this.workStationProductTypes = workStationProductTypes;
        });
      }
    });

    this.workStationService.getWorkStations().then(workStations => this.workStations = workStations);
  }

  save(): void {
    this.workStationProductTypesService
        .save(this.workStationProductTypes)
        .then(workStationProductTypes => {
          this.workStationProductTypes = workStationProductTypes; 

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
