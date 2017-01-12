import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DelayType } from '../delayType';
import { DelayTypeService } from '../delayType.service';

@Component({
  selector: 'app-delayType-detail',
  templateUrl: './delayType-detail.component.html',
  providers:[DelayTypeService]
})
export class DelayTypeDetailComponent implements OnInit {

  delayType : DelayType;
  delayTypes: DelayType[];
  selectedDelayType: DelayType = new DelayType(); 

  constructor(private route: ActivatedRoute, private delayTypeService: DelayTypeService, private delayTypeTypeService: DelayTypeService) { 
    this.delayType = new DelayType();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.delayTypeService.get(params["id"]).then(delayType =>{ 
          this.delayType = delayType;
          this.selectedDelayType = this.delayType;
        });
      }
    });
  }

  save(delayType: DelayType): void {
    this.delayTypeService
        .save(this.delayType)
        .then(delayType => {
          this.delayType = delayType; 
        }).catch(error => {
        })
  }

}
