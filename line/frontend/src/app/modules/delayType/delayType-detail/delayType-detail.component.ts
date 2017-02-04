import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DelayType } from '../delayType';
import { DelayTypeService } from '../delayType.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-delayType-detail',
  templateUrl: './delayType-detail.component.html',
  providers:[DelayTypeService]
})
export class DelayTypeDetailComponent implements OnInit {

  message: Message = new Message();
  delayType : DelayType;
  delayTypes: DelayType[];
  selectedDelayType: DelayType = new DelayType(); 

  constructor(private location: Location, private route: ActivatedRoute, private delayTypeService: DelayTypeService, private delayTypeTypeService: DelayTypeService) { 
    this.delayType = new DelayType();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.delayTypeService.get(params["id"])
          .then(delayType =>{ 
            this.delayType = delayType;
            this.selectedDelayType = this.delayType;
          })
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          });;
      }
    });
  }

  save(delayType: DelayType): void {
    this.delayTypeService
        .save(this.delayType)
        .then(delayType => {
          //this.delayType = delayType; 

          this.message.success("");

          Commons.delay().then(() => {
            this.location.back();
          });
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

}
