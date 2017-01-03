import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../workStation';
import { WorkStationService } from '../workStation.service';

@Component({
  selector: 'app-workStation-list',
  templateUrl: './workStation-list.component.html',
  styleUrls: ['./workStation-list.component.css'],
  providers:[WorkStationService]
})
export class WorkStationListComponent implements OnInit {
  workStations: WorkStation[];

  constructor(private router: Router, private workStationService: WorkStationService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.workStationService.getWorkStations().then(workStations => this.workStations = workStations);
  }

  create(): void {
    this.router.navigate(['../workStation'],{ relativeTo: this.r });
  }

  edit(workStation: WorkStation): void {
    this.router.navigate(['../workStation', workStation.id],{ relativeTo: this.r });
  }

  remove(workStation: WorkStation): void {
    this.workStationService.removeWorkStation(workStation).then(workStation => this.workStations = this.workStations.filter(u => u.id !== workStation.id));
  }

}
