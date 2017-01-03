import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../user/user';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-workstation-product-types',
  templateUrl: './workStationUsers.component.html',
  styleUrls: ['./workStationUsers.component.css'],
  providers:[UserService]
})
export class WorkStationUsersComponent implements OnInit {

  message : String = "";
  
  workStations : WorkStation[];
  workStationUsers: WorkStationUsers;
  
  prevWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");
  currentWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");
  nextWorkstation : WorkStation = new WorkStation(-1,"Select...","0.0.0.0");

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService, private workStationUsersService: WorkStationUsersService) { 
      
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.workStationUsersService.getWorkStationUsers(params["id"]).then(workStationUsers =>{ 
          this.workStationUsers = workStationUsers;
        });
      }
    });

    this.workStationService.getWorkStations().then(workStations => this.workStations = workStations);
  }

  save(): void {
    this.workStationUsersService
        .save(this.workStationUsers)
        .then(workStationUsers => {
          this.workStationUsers = workStationUsers; 

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
