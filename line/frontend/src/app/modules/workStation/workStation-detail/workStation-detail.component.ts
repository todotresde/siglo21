import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WorkStation } from '../workStation';
import { WorkStationService } from '../workStation.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-workStation-detail',
  templateUrl: './workStation-detail.component.html',
  providers:[WorkStationService]
})
export class WorkStationDetailComponent implements OnInit {
  message: Message = new Message();
  workStation : WorkStation;

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private workStationService: WorkStationService) { 
    this.workStation = new WorkStation();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.workStationService.get(params["id"]).then(workStation =>{ 
          this.workStation = workStation;
        });
      }
    });
  }

  save(workStation: WorkStation): void {
    this.workStationService
        .save(workStation)
        .then(w => { 
          this.message.success("");

          Commons.delay().then(() => {
            this.location.back();
          });
          
        })
        .catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
