import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from '../delay';
import { DelayService } from '../delay.service';
import { DelayType } from '../../delayType/delayType';
import { DelayTypeService } from '../../delayType/delayType.service';

@Component({
  selector: 'app-delay-detail',
  templateUrl: './delay-detail.component.html',
  providers:[DelayService, DelayTypeService]
})
export class DelayDetailComponent implements OnInit {

  delay : Delay;
  delayTypes: DelayType[];
  selectedDelayType: DelayType = new DelayType(); 

  constructor(private route: ActivatedRoute, private delayService: DelayService, private delayTypeService: DelayTypeService) { 
    this.delay = new Delay();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.delayService.get(params["id"]).then(delay =>{ 
          this.delay = delay;
          this.selectedDelayType = this.delay.delayType;
        });
      }
    });

    this.delayTypeService.getAll().then(delayTypes => this.delayTypes = delayTypes);
  }

  save(delay: Delay): void {
    this.delay.delayType = this.selectedDelayType;

    this.delayService
        .save(this.delay)
        .then(delay => {
          this.delay = delay; 
        }).catch(error => {
        })
  }

}
