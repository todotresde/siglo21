import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'app/modules/user';
import { ProductType } from 'app/modules/productType';
import { WorkStation, WorkStationService } from 'app/modules/workStation';
import { WorkStationConfiguration } from '../workStationConfiguration';
import { WorkStationConfigurationService } from '../workStationConfiguration.service';

import { Message } from 'app/shared';

@Component({
  selector: 'app-workstation-configuration-detail',
  templateUrl: './workStationConfiguration-detail.component.html',
  providers:[WorkStationService, WorkStationConfigurationService]
})
export class WorkStationConfigurationDetailComponent implements OnInit, OnChanges {
  @Input() inputWorkStationConfiguration = new WorkStationConfiguration();
  @Output() outputWorkStationConfiguration = new EventEmitter<WorkStationConfiguration>();

  message: Message = new Message();
  workStations : WorkStation[];
  workStationConfiguration: WorkStationConfiguration;
  
  prevWorkStation? : WorkStation = null;
  currentWorkStation? : WorkStation = null;
  nextWorkStation? : WorkStation = null;

  cleanUsers: boolean = false;
  cleanProductTypes: boolean = false;

  constructor(private route: ActivatedRoute, private workStationService: WorkStationService, private workStationConfigurationService: WorkStationConfigurationService) { 
      this.workStationConfiguration = new WorkStationConfiguration();
  }

  ngOnInit() : void{
    this.workStationService.getAll().then(workStations => this.workStations = workStations);
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputWorkStationConfiguration"].currentValue)
      this.workStationConfiguration = changes["inputWorkStationConfiguration"].currentValue;
    else
      this.workStationConfiguration = new WorkStationConfiguration();

    this.prevWorkStation = this.workStationConfiguration.prevWorkStation;
    this.currentWorkStation = this.workStationConfiguration.workStation;
    this.nextWorkStation = this.workStationConfiguration.nextWorkStation;
    
  }

  addWorkStation(prevWorkStation: WorkStation, currentWorkStation: WorkStation, nextWorkStation: WorkStation): void {
    this.workStationConfiguration.prevWorkStation = prevWorkStation;
    this.workStationConfiguration.workStation = currentWorkStation;
    this.workStationConfiguration.nextWorkStation = nextWorkStation;

    if(this.valid(this.workStationConfiguration)){

      this.outputWorkStationConfiguration.emit(this.workStationConfiguration);

      this.prevWorkStation = null;
      this.currentWorkStation = null;
      this.nextWorkStation = null;
      this.cleanUsers = true;
      this.cleanProductTypes = true;

      this.message.none();
    }else{
      this.message.error("error-missing-values");
    }
  }

  setUsers(users: User[]): void {
    this.workStationConfiguration.users = users;
  }

  setProductTypes(productTypes: ProductType[]){
    this.workStationConfiguration.productTypes = productTypes;
  }

  private valid(workStationConfiguration: WorkStationConfiguration): boolean{
    return (
       workStationConfiguration.users.length > 0 && 
       workStationConfiguration.productTypes.length > 0 && (
            workStationConfiguration.prevWorkStation != null && workStationConfiguration.workStation != null ||
            workStationConfiguration.nextWorkStation != null && workStationConfiguration.workStation != null 
          )
       );
  }

}
