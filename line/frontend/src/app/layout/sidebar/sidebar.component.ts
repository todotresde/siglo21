import { Component, OnInit } from '@angular/core';

import { WorkStation } from '../../modules/workStation/workStation';
import { WorkStationService } from '../../modules/workStation/workStation.service';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[WorkStationService]
})
export class SidebarComponent implements OnInit {
  submenues: any = {
  	"delays" : true,
    "security" : true,
    "configuration" : true,
    "trace-screens" : true
  };

  workStations: WorkStation[];

  constructor(private workStationService: WorkStationService) { }

  ngOnInit() {
    this.workStationService
      .getAll()
      .then(workStations => this.workStations = workStations)
  }

  toogleSubmenu(element: string) {
	  this.submenues[element] = !this.submenues[element];
  }

}
