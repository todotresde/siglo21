import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../../../workStation/workStation';
import { WorkStationConfiguration } from '../workStationConfiguration';
import { WorkStationConfigurationService } from '../workStationConfiguration.service';

@Component({
  selector: 'app-workstation-configuration-list',
  templateUrl: './workStationConfiguration-list.component.html',
  providers:[WorkStationConfigurationService]
})
export class WorkStationConfigurationListComponent implements OnInit, OnChanges {
  @Input() inputWorkStationConfigurations: WorkStationConfiguration[];
  @Output() selectedWorkStationConfiguration = new EventEmitter<WorkStationConfiguration>();

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
  }

  addWorkStationConfiguration(workStationConfiguration: WorkStationConfiguration) : void{
    this.workStationConfigurations.push(workStationConfiguration);
  }

  remove(workStationConfiguration: WorkStationConfiguration): void {
    this.workStationConfigurations = this.workStationConfigurations.filter(w => w.id !== workStationConfiguration.id);
  }

  edit(workStationConfiguration: WorkStationConfiguration): void {
    this.selectedWorkStationConfiguration.emit(workStationConfiguration);
  }
}
