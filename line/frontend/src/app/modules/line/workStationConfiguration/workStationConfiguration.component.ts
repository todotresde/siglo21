import { Component, OnChanges, SimpleChange, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WorkStationConfiguration } from '../workStationConfiguration/workStationConfiguration';
import { WorkStationConfigurationService } from '../workStationConfiguration/workStationConfiguration.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-workstation-configuration',
  templateUrl: './workStationConfiguration.component.html',
  providers: [WorkStationConfigurationService]
})
export class WorkStationConfigurationComponent implements OnInit, OnChanges {
	@Input() inputWorkStationConfigurations: WorkStationConfiguration[];
	@Output() outputWorkStationConfigurations = new EventEmitter<WorkStationConfiguration[]>();
  
  message: Message = new Message();
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
    if(this.exist(workStationConfiguration)){
      this.message.error("error-worksation-configuration-already-assigned");
    }else{
      this.workStationConfigurations.push(workStationConfiguration);
      this.selectedWorkStationConfiguration = new WorkStationConfiguration();
      this.message.none();
    }
  }

  private exist(workStationConfiguration: WorkStationConfiguration): boolean{
    let result: WorkStationConfiguration[] = this.workStationConfigurations.filter(w => {
      return w.workStation.id === workStationConfiguration.workStation.id && 
        w.nextWorkStation.id === workStationConfiguration.nextWorkStation.id && 
        w.prevWorkStation.id === workStationConfiguration.prevWorkStation.id;
    });
    return result.length > 0;
  }
}
