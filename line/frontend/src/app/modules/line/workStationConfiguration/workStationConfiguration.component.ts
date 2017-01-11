import { Component, OnChanges, SimpleChange, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WorkStationConfiguration } from '../workStationConfiguration/workStationConfiguration';
import { WorkStationConfigurationService } from '../workStationConfiguration/workStationConfiguration.service';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-workstation-configuration',
  templateUrl: './workStationConfiguration.component.html',
  providers: [WorkStationConfigurationService]
})
export class WorkStationConfigurationComponent implements OnInit, OnChanges {
	@Input() inputWorkStationConfigurations: WorkStationConfiguration[];
	@Output() outputWorkStationConfigurations = new EventEmitter<WorkStationConfiguration[]>();
  	
  workStationConfigurations: WorkStationConfiguration[];
  selectedWorkStationConfiguration: WorkStationConfiguration;

  constructor(private workStationConfigurationService: WorkStationConfigurationService){

  }

	ngOnInit() : void{
		this.workStationConfigurations = this.inputWorkStationConfigurations;
	}

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputWorkStationConfigurations"].currentValue)
      this.workStationConfigurations = changes["inputWorkStationConfigurations"].currentValue;
    else
      this.workStationConfigurations = [];
  }

  setSelectedWorkStationConfiguration(workStationConfiguration: WorkStationConfiguration) : void{
    this.selectedWorkStationConfiguration = workStationConfiguration;

    this.outputWorkStationConfigurations.emit(this.workStationConfigurations);
  }

  addWorkStationConfiguration(workStationConfiguration: WorkStationConfiguration) : void{
    this.workStationConfigurations.push(workStationConfiguration);
  }
}
