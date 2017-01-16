import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../../../workStation/workStation';
import { WorkStationConfiguration } from '../workStationConfiguration';
import { WorkStationConfigurationService } from '../workStationConfiguration.service';

import { Message } from '../../../../shared/message/message';

@Component({
  selector: 'app-workstation-configuration-list',
  templateUrl: './workStationConfiguration-list.component.html',
  providers:[WorkStationConfigurationService]
})
export class WorkStationConfigurationListComponent implements OnInit, OnChanges {
  @Input() inputWorkStationConfigurations: WorkStationConfiguration[];
  @Output() selectedWorkStationConfiguration = new EventEmitter<WorkStationConfiguration>();

  message: Message = new Message();
  workStationConfigurations: WorkStationConfiguration[];
  
  constructor(private router: Router, private route: ActivatedRoute, private workStationConfigurationService: WorkStationConfigurationService) { 
      
  }

  ngOnInit() : void{
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputWorkStationConfigurations"].currentValue)
      this.workStationConfigurations = changes["inputWorkStationConfigurations"].currentValue;
    else
      this.workStationConfigurations = [];
  }

  create(): void {
    this.selectedWorkStationConfiguration.emit(new WorkStationConfiguration());
  }

  addWorkStationConfiguration(workStationConfiguration: WorkStationConfiguration) : void{
    if(this.exist(workStationConfiguration)){
      this.message.error("error-product-type-already-assigned");
    }else{
      this.workStationConfigurations.push(workStationConfiguration);
      this.message.none();
    }
  }

  remove(workStationConfiguration: WorkStationConfiguration): void {
    this.workStationConfigurations = this.workStationConfigurations.filter(w => w.id !== workStationConfiguration.id);
  }

  edit(workStationConfiguration: WorkStationConfiguration): void {
    this.selectedWorkStationConfiguration.emit(workStationConfiguration);
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
