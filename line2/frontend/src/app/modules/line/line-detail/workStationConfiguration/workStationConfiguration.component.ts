import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../user/user';
import { WorkStation } from '../../../workStation/workStation';
import { WorkStationService } from '../../../workStation/workStation.service';
import { WorkStationConfiguration } from './workStationConfiguration';
import { WorkStationConfigurationService } from './workStationConfiguration.service';

@Component({
  selector: 'app-workstation-configuration',
  templateUrl: './workStationConfiguration.component.html',
  styleUrls: ['./workStationConfiguration.component.css'],
  providers:[WorkStationService, WorkStationConfigurationService]
})
export class WorkStationConfigurationComponent implements OnInit {

  message : String = "";
  
  workStations : WorkStation[];
  workStationConfiguration: WorkStationConfiguration;
  
  prevWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");
  currentWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");
  nextWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService, private workStationConfigurationService: WorkStationConfigurationService) { 
      this.workStationConfiguration = new WorkStationConfiguration();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.workStationConfigurationService.getWorkStationConfiguration(params["id"]).then(workStationConfiguration =>{ 
          this.workStationConfiguration = workStationConfiguration;
        });
      }
    });

    this.workStationService.getWorkStations().then(workStations => this.workStations = workStations);
  }

  save(): void {
    this.workStationConfigurationService
        .save(this.workStationConfiguration)
        .then(workStationConfiguration => {
          this.workStationConfiguration = workStationConfiguration; 

          //this.messageType = MESSAGE_TYPE.Success;
          this.message = "save-success";
          
          this.goBack();
        }).catch(error => {
          //this.messageType = MESSAGE_TYPE.Error;
          this.message = error;
        })
  }

  setUsers(users: User[]): void {
    this.workStationConfiguration.users = users;
  }

  goBack(): void {
    window.history.back();
  }

}
