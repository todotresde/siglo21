import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkStation } from '../workStation';
import { WorkStationService } from '../workStation.service';

import { Message } from '../../../shared/message/message';

@Component({
  selector: 'app-workStation-list',
  templateUrl: './workStation-list.component.html',
  providers:[WorkStationService]
})
export class WorkStationListComponent implements OnInit {
  message: Message = new Message();
  workStations: WorkStation[];

  constructor(private router: Router, private workStationService: WorkStationService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.workStationService
      .getAll()
      .then(workStations => this.workStations = workStations)
      .catch(error => {
          this.message.error(JSON.parse(error._body).message);
      })
  }

  create(): void {
    this.router.navigate(['../workStation'],{ relativeTo: this.r });
  }

  edit(workStation: WorkStation): void {
    this.router.navigate(['../workStation', workStation.id],{ relativeTo: this.r });
  }

  remove(workStation: WorkStation): void {
    this.workStationService
      .remove(workStation)
      .then(workStation => {
          this.workStations = this.workStations.filter(u => u.id !== workStation.id)
          this.message.success();
      })
      .catch(error => {
          this.message.error(JSON.parse(error._body).message);
      })
  }

}
