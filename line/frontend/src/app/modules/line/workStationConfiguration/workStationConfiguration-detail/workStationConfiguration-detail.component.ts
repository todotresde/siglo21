import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../user/user';
import { ProductType } from '../../../productType/ProductType';
import { WorkStation } from '../../../workStation/workStation';
import { WorkStationService } from '../../../workStation/workStation.service';
import { WorkStationConfiguration } from '../workStationConfiguration';
import { WorkStationConfigurationService } from '../workStationConfiguration.service';

@Component({
  selector: 'app-workstation-configuration-detail',
  templateUrl: './workStationConfiguration-detail.component.html',
  providers:[WorkStationService, WorkStationConfigurationService]
})
export class WorkStationConfigurationDetailComponent implements OnInit, OnChanges {
  @Input() inputWorkStationConfiguration = new WorkStationConfiguration();
  @Output() outputWorkStationConfiguration = new EventEmitter<WorkStationConfiguration>();

  workStations : WorkStation[];
  workStationConfiguration: WorkStationConfiguration;
  
  prevWorkStation : WorkStation = new WorkStation();
  currentWorkStation : WorkStation = new WorkStation();
  nextWorkStation : WorkStation = new WorkStation();

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
  }

  addWorkStation(prevWorkStation: WorkStation, currentWorkStation: WorkStation, nextWorkStation: WorkStation): void {
    this.workStationConfiguration.prevWorkStation = prevWorkStation;
    this.workStationConfiguration.workStation = currentWorkStation;
    this.workStationConfiguration.nextWorkStation = nextWorkStation;

    this.outputWorkStationConfiguration.emit(this.workStationConfiguration);
  }

  setUsers(users: User[]): void {
    this.workStationConfiguration.users = users;
  }

  setProductTypes(productTypes: ProductType[]){
    this.workStationConfiguration.productTypes = productTypes;
  }

}
